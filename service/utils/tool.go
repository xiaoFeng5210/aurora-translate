package utils

import (
	"os"
	"time"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
)

var logger *zap.Logger

func InitLogger() *zap.Logger {
	// 配置 lumberjack
	logWriter := &lumberjack.Logger{
		Filename:   "logs/" + time.Now().Format("2006-01-02") + ".log", // 日志文件路径
		MaxSize:    10,                                                 // 每个日志文件保存的最大尺寸 单位：M
		MaxBackups: 30,                                                 // 日志文件最多保存多少个备份
		MaxAge:     7,                                                  // 文件最多保存多少天
		Compress:   false,                                              // 是否压缩
	}

	// zap 的编码器配置
	encoderConfig := zap.NewProductionEncoderConfig()
	encoderConfig.TimeKey = "timestamp"
	// 再把时间精确到毫秒
	encoderConfig.EncodeTime = zapcore.TimeEncoderOfLayout("2006-01-02 15:04:05.000")
	encoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder

	// 创建核心
	core := zapcore.NewCore(
		zapcore.NewJSONEncoder(encoderConfig), // 编码器配置
		zapcore.NewMultiWriteSyncer( // 输出方式
			zapcore.AddSync(logWriter), // 文件输出
			zapcore.AddSync(os.Stdout), // 控制台输出
		),
		zap.InfoLevel, // 日志级别
	)

	// 创建 logger
	logger := zap.New(core, zap.AddCaller())
	return logger
}

func GetLogger() *zap.Logger {
	if logger == nil {
		logger = InitLogger()
	}
	return logger
}
