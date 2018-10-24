export const state = () => ({
  sidebar: false,
  steps: 3,
   step: undefined
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}
