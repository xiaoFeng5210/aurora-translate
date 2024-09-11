# 使用官方Go镜像作为构建环境
FROM golang:1.21 as builder

# 设置工作目录
WORKDIR /app

# 复制go mod和sum文件
COPY go.mod go.sum ./

# 下载依赖
RUN go mod download

# 复制源代码
COPY . .

# 构建应用
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# 使用轻量级的alpine镜像
FROM alpine:latest  

# 从builder阶段复制编译好的执行文件
COPY --from=builder /app/main /main

# 暴露8080端口
EXPOSE 8080

# 运行
CMD ["/main"]
