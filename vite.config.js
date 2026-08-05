import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' 로 두면 github.io 의 프로젝트 페이지(사용자.github.io/레포이름/)
// 와 사용자 페이지(사용자.github.io/) 어디에 올려도 에셋 경로가 깨지지 않습니다.
export default defineConfig({
  base: './',
  plugins: [react()],
})
