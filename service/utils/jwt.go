package utils

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// JWT密钥，实际项目中建议通过配置文件或环境变量注入
var jwtSecret = []byte("12345678abcdefghijklmnopqrstuvwxyz")

// 过期时间 3天
const tokenExpireDuration = time.Hour * 24 * 3

// Claims 自定义声明
type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

// GenerateToken 生成JWT令牌
func GenerateToken(username string) (string, error) {
	claims := jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(tokenExpireDuration).Unix(),
		"iat":      time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

// ParseToken 解析JWT令牌
func ParseToken(tokenString string) (string, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims.Username, nil
	}

	return "", errors.New("invalid token")
}

// ValidateToken 验证令牌是否有效
// @param tokenString 要验证的令牌字符串
// @return bool 是否有效
func ValidateToken(tokenString string) bool {
	_, err := ParseToken(tokenString)
	return err == nil
}

// RefreshToken 刷新令牌
// @param tokenString 原令牌字符串
// @return string 新令牌
// @return error 错误信息
// func RefreshToken(tokenString string) (string, error) {
// 解析原token
// claims, err := ParseToken(tokenString)
// if err != nil {
// 	return "", err
// }

// if time.Until(claims.ExpiresAt.Time) > 24*time.Hour {
// 	return tokenString, nil
// }

// return GenerateToken(claims)
// }

// GetUsernameFromToken 从令牌中获取用户名
// @param tokenString 令牌字符串
// @return string 用户名
// @return error 错误信息
func GetUsernameFromToken(tokenString string) (string, error) {
	claims, err := ParseToken(tokenString)
	if err != nil {
		return "", err
	}
	return claims, nil
}

// GetRoleFromToken 从令牌中获取用户角色
// @param tokenString 令牌字符串
// @return string 用户角色
// @return error 错误信息
func GetRoleFromToken(tokenString string) (string, error) {
	claims, err := ParseToken(tokenString)
	if err != nil {
		return "", err
	}
	return claims, nil
}
