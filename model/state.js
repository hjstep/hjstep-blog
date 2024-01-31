const state = {
  posts: [],
  isPending: true,
}

const fetchPosts = async () => {
  try {
    if (!state.isPending) return
    const response = await fetch('./data/react.json')

    if (!response.ok) {
      throw new Error('Failed to fetch JSON file')
    }

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
    if (state[key] === undefined) {
      throw new Error('undefined key')
    }
    return state[key]
  } catch (error) {
    console.error('Error load state:', error)
  }
}
