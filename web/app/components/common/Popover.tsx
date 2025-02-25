"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  trigger?: "hover" | "click";
  className?: string;
  contentClassName?: string;
  offset?: number;
}

export function Popover({
  children,
  content,
  position = "top",
  trigger = "hover",
  className = "",
  contentClassName = "",
  offset = 2,
}: PopoverProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 创建 portal 容器
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setPortalContainer(document.body);
    }
  }, []);

  // 处理点击外部关闭
  useEffect(() => {
    if (trigger === "click" && isVisible) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          setIsVisible(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [trigger, isVisible]);

  // 计算 popover 位置
  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = triggerRect.top + scrollTop - (offset || 0);
          left = triggerRect.left + scrollLeft + triggerRect.width / 2;
          break;
        case "right":
          top = triggerRect.top + scrollTop + triggerRect.height / 2;
          left = triggerRect.right + scrollLeft + (offset || 0);
          break;
        case "bottom":
          top = triggerRect.bottom + scrollTop + (offset || 0);
          left = triggerRect.left + scrollLeft + triggerRect.width / 2;
          break;
        case "left":
          top = triggerRect.top + scrollTop + triggerRect.height / 2;
          left = triggerRect.left + scrollLeft - (offset || 0);
          break;
      }

      setPopoverPosition({ top, left });
    }
  }, [isVisible, position, offset]);

  // 根据触发方式设置事件处理器
  const getTriggerHandlers = () => {
    if (trigger === "hover") {
      return {
        onMouseEnter: () => setIsVisible(true),
        onMouseLeave: () => setIsVisible(false),
      };
    } else {
      return {
        onClick: () => setIsVisible(!isVisible),
      };
    }
  };

  // 根据位置计算样式
  const getPositionStyles = () => {
    const positionStyles: React.CSSProperties = {
      position: 'absolute',
      zIndex: 9999,
    };

    switch (position) {
      case "top":
        positionStyles.transform = 'translate(-50%, -100%)';
        positionStyles.marginBottom = `${offset}px`;
        break;
      case "right":
        positionStyles.transform = 'translateY(-50%)';
        positionStyles.marginLeft = `${offset}px`;
        break;
      case "bottom":
        positionStyles.transform = 'translateX(-50%)';
        positionStyles.marginTop = `${offset}px`;
        break;
      case "left":
        positionStyles.transform = 'translateY(-50%) translateX(-100%)';
        positionStyles.marginRight = `${offset}px`;
        break;
    }

    return positionStyles;
  };

  return (
    <div className={`relative inline-block ${className}`} ref={triggerRef} {...getTriggerHandlers()}>
      {children}
      {isVisible && portalContainer && createPortal(
        <div
          ref={contentRef}
          className={`${contentClassName}`}
          style={{
            ...getPositionStyles(),
            top: `${popoverPosition.top}px`,
            left: `${popoverPosition.left}px`,
          }}
        >
          <div className="bg-white rounded-lg shadow-lg py-2 px-3 text-sm w-fit whitespace-nowrap">
            {content}
          </div>
        </div>,
        portalContainer
      )}
    </div>
  );
}
