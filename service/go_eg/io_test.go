package goeg

import (
	"fmt"
	"io"
	"os"
	"testing"
)

func TestReadFile(t *testing.T) {
	fs, err := os.Open("file.txt")
	fmt.Println(fs)
	if err != nil {
		fmt.Println("读取文件失败", err)
		return
	}
	defer fs.Close()
	bufSlice, err := io.ReadAll(fs)
	if err != nil {
		fmt.Println("读取文件失败", err)
		return
	}
	fmt.Println(bufSlice)
	fmt.Println(string(bufSlice))
}
