"use client";
import { useState, useEffect, useCallback } from "react";
import { Nav } from "../components/Nav";
import { collectionApi, CollectionItem } from "../../api/collectionApi";
import { showToast } from "../components/common/Toast";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { Pagination } from "../components/common/Pagination";
import { useAuthStore } from "@/app/store/auth";
import debounce from "lodash/debounce";

export default function CollectionPage() {
  const { isAuthenticated, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    itemId: number | null;
  }>({
    isOpen: false,
    itemId: null,
  });
  const [editItem, setEditItem] = useState<{
    id: number | null;
    text: string;
  }>({
    id: null,
    text: '',
  });

  // 创建一个防抖的请求函数
  const debouncedFetch = useCallback(
    debounce(async (query: string, page: number = 1) => {
      try {
        setLoading(true);
        const response = await collectionApi.getCollections({
          pageNumber: page,
          pageSize: pagination.pageSize,
          keyword: query
        });
        setCollections(response.data.list);
        setPagination(prev => ({
          ...prev,
          total: response.data.total
        }));
      } catch (error) {
        showToast.error((error as Error).message || "获取收藏列表失败");
        if (isAuthenticated) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    }, 500),
    [pagination.pageSize, isAuthenticated, logout]
  );

  // 修改搜索框的处理方法
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPagination(prev => ({ ...prev, page: 1 })); // 重置到第一页
    debouncedFetch(value);
  };

  // 监听页码变化
  useEffect(() => {
    debouncedFetch(searchQuery, pagination.page);
  }, [pagination.page, searchQuery, debouncedFetch]);

  // 在组件卸载时取消未执行的防抖函数
  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  const handleDelete = async (id: number) => {
    try {
      await collectionApi.deleteCollection(id);
      setCollections(prev => prev.filter(item => item.id !== id));
      showToast.success("删除成功");
      setPagination(prev => ({ ...prev, total: prev.total - 1 }));
    } catch (error) {
      showToast.error("删除失败");
    }
  };

  const handleEdit = (item: CollectionItem) => {
    setEditItem({
      id: item.id,
      text: item.targetText,
    });
  };

  const handleCancelEdit = () => {
    setEditItem({
      id: null,
      text: '',
    });
  };

  const handleSaveEdit = async () => {
    if (!editItem.id) return;

    try {
      setLoading(true);
      const response = await collectionApi.updateTranslation({
        id: editItem.id,
        targetText: editItem.text,
      });

      if (response?.data?.code === 0) {
        // 更新本地数据
        setCollections(prev =>
          prev.map(item =>
            item.id === editItem.id
              ? { ...item, targetText: editItem.text }
              : item
          )
        );
      } else {
        showToast.error(response?.data?.message || "更新失败");
      }

      setCollections(prev =>
        prev.map(item =>
          item.id === editItem.id
            ? { ...item, targetText: editItem.text }
            : item
        )
      );

      showToast.success("更新成功");
      setEditItem({ id: null, text: '' });
    } catch (error) {
      showToast.error("更新失败");
    } finally {
      setLoading(false);
    }
  };

  const filteredCollections = collections.filter(
    (item: CollectionItem) =>
      item.sourceText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetText.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
      data-oid="t:x_ph:"
    >
      <Nav data-oid="y0o6hov" />
      <div className="max-w-6xl mx-auto px-4 py-8" data-oid="edfvsvi">
        <div className="text-center mb-8" data-oid="2y9xp-k">
          <h1
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
            data-oid="guk-ruv"
          >
            我的收藏
          </h1>
          <p className="text-gray-600 mt-2" data-oid="3kj:0yp">
            保存您喜欢的翻译内容
          </p>
        </div>

        {/* 搜索框 */}
        <div className="mb-6" data-oid="o2gmd37">
          <div className="max-w-xl mx-auto" data-oid="sz6q_pu">
            <div className="relative" data-oid="uehfyzu">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="搜索收藏的翻译..."
                className="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                data-oid=":70aghx"
              />

              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                data-oid="u0li20q"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  data-oid="fi-q28k"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 收藏列表容器 */}
        <div
          className="bg-white rounded-2xl shadow-xl p-6 md:p-6"
          data-oid="l-p0qz4"
        >
          <div
            className="h-[47vh] min-h-[100px] w-full overflow-y-auto"
            data-oid="h4s2ehn"
          >
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-purple-500 rounded-full border-t-transparent mx-auto"></div>
              </div>
            ) : collections.length === 0 ? (
              <div
                className="text-center py-12 text-gray-500"
                data-oid="doo-ip-"
              >
                没有找到匹配的翻译内容
              </div>
            ) : (
              <div className="space-y-4" data-oid="y1dm.0v">
                {collections.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border border-gray-100 rounded-xl hover:border-purple-200 transition-all hover:shadow-sm"
                    data-oid="3dhj8g7"
                  >
                    <div
                      className="grid md:grid-cols-2 gap-6"
                      data-oid="q6byqtc"
                    >
                      {/* 原文 */}
                      <div className="space-y-2" data-oid="y9kjqyv">
                        <div
                          className="text-sm font-medium text-gray-500 flex items-center gap-2"
                          data-oid="13vw-rx"
                        >
                          <span data-oid="u8ok8at">原文</span>
                          <span
                            className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                            data-oid="c:1xfri"
                          >
                            {item.sourceLang}
                          </span>
                        </div>
                        <div
                          className="text-gray-800 min-h-[60px]"
                          data-oid="jwd59k7"
                        >
                          {item.sourceText}
                        </div>
                      </div>
                      {/* 译文 */}
                      <div className="space-y-2" data-oid="j9krv_u">
                        <div
                          className="text-sm font-medium text-gray-500 flex items-center gap-2"
                          data-oid="047u8jy"
                        >
                          <span data-oid="ephygfw">译文</span>
                          <span
                            className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                            data-oid="4w:bm1b"
                          >
                            {item.targetLang}
                          </span>
                        </div>
                        {editItem.id === item.id ? (
                          <div className="relative">
                            <textarea
                              value={editItem.text}
                              onChange={(e) => setEditItem(prev => ({ ...prev, text: e.target.value }))}
                              className="w-full min-h-[60px] p-2 text-gray-800 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <div className="flex justify-end mt-2 space-x-2">
                              <button
                                onClick={handleCancelEdit}
                                className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                                disabled={loading}
                              >
                                取消
                              </button>
                              <button
                                onClick={handleSaveEdit}
                                className="px-3 py-1 text-sm text-white bg-purple-600 rounded-md hover:bg-purple-700"
                                disabled={loading}
                              >
                                {loading ? '保存中...' : '保存'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="text-gray-800 min-h-[60px]"
                            data-oid="tg4g1k9"
                          >
                            {item.targetText}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* 底部操作栏 */}
                    <div
                      className="mt-4 flex justify-between items-center text-sm border-t border-gray-100 pt-4"
                      data-oid="s8_haib"
                    >
                      <div className="text-gray-500" data-oid="6zd6lu:">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                      <div
                        className="flex items-center gap-3"
                        data-oid="v2:cjna"
                      >
                        <button
                          className="text-gray-400 hover:text-purple-600 p-1 relative"
                          data-oid="rf23y8."
                          onClick={() => {
                            navigator.clipboard.writeText(item.targetText);
                            showToast.success("复制成功");

                            // 创建复制成功的动画效果
                            const button = document.querySelector(`[data-oid="rf23y8."]`);
                            if (button) {
                              const successIcon = document.createElement('div');
                              successIcon.className = 'absolute -top-8 left-1/2 transform -translate-x-1/2 text-green-500 opacity-0 transition-all duration-300';
                              successIcon.innerHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                              `;
                              button.appendChild(successIcon);

                              // 动画
                              setTimeout(() => {
                                successIcon.classList.replace('opacity-0', 'opacity-100');
                                successIcon.classList.add('-translate-y-2');
                              }, 10);

                              // 移除动画元素
                              setTimeout(() => {
                                successIcon.classList.replace('opacity-100', 'opacity-0');
                                setTimeout(() => {
                                  button.removeChild(successIcon);
                                }, 300);
                              }, 1500);
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            data-oid="o:c.7qm"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              data-oid=".:z9r9w"
                            />
                          </svg>
                        </button>
                        {editItem.id !== item.id && (
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-gray-400 hover:text-purple-600 p-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                        )}
                        <button
                          onClick={() => setDeleteConfirm({ isOpen: true, itemId: item.id })}
                          className="text-gray-400 hover:text-red-500 p-1"
                          data-oid="185g-xi"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            data-oid="zx78668"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              data-oid="dz1r42g"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={pagination.page}
        pageSize={pagination.pageSize}
        total={pagination.total}
        loading={loading}
        onPageChange={(page) => setPagination(prev => ({ ...prev, page }))}
      />
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, itemId: null })}
        onConfirm={async () => {
          if (deleteConfirm.itemId) {
            await handleDelete(deleteConfirm.itemId);
          }
        }}
        title="确认删除"
        message="确定要删除这条收藏吗？此操作无法撤销。"
      />
    </div>
  );
}
