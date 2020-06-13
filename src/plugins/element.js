import {
  Select, Option, OptionGroup, Input, Tree, Dialog, Row, Col, Form,
  FormItem, Button, Container, Header, Aside, Main, Scrollbar, SidebarItem,
  MenuItem
} from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(OptionGroup)
    Vue.use(Input)
    Vue.use(Tree)
    Vue.use(Dialog)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Button)
    Vue.use(Container)
    Vue.use(Header)
    Vue.use(Aside)
    Vue.use(Main)
    Vue.use(Scrollbar)
    Vue.use(SidebarItem)
    Vue.use(MenuItem)
  }
}
export default element
