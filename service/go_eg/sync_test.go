package goeg

import (
	"fmt"
	"sync"
	"testing"
	"time"
)

func TestSync(t *testing.T) {
	ch := make(chan int)

	var wg sync.WaitGroup

	wg.Add(1) // 增加一个任务
	go func() {
		defer wg.Done()
		defer close(ch) // 关闭通道
		for i := 0; i < 5; i++ {
			ch <- i
			time.Sleep(time.Second * 3)
		}
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		for value := range(ch) {
			fmt.Println(value)
		}
	}()

	wg.Wait()
}
