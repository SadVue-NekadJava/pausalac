export const state = () => ({
  sidebar: false,
  steps: 3,
   step: undefined,
   logged:false
})
export const getters=(state)=>({
  getLogged(){
    return state.logged;
  }
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  change (state){
    state.logged=true;
  },
  changeFalse(state){
    state.logged=false;
  }
}
