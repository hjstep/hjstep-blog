const state = {
  posts: [],
  isPending: true,
}

const fetchPosts = async () => {
  if (!state.isPending) return
  try {
    const response = await fetch('./data/react.json')
    if (!response.ok) throw new Error('Failed to fetch JSON file')

    const { posts } = await response.json()
    state.posts = posts
    state.isPending = false
  } catch (error) {
    console.error('Error fetching JSON file:', error)
  }
}

export default async (key) => {
  try {
    await fetchPosts()
    if (state[key] === undefined) throw new Error('Undefined key')
    return state[key]
  } catch (error) {
    console.error('Error loading state:', error)
    return null // 또는 적절한 에러 처리
  }
}
