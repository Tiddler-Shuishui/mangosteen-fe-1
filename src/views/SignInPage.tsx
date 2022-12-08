import { defineComponent, reactive } from "vue"
import { MainLayout } from "../layouts/MainLayout"
import { Form, FormItem } from "../shared/Form"
import { Icon } from "../shared/Icon"
import { validate } from "../shared/validate"
import s from './SignInPage.module.scss'
export const SignInPage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: '',
      code: ''
    })
    const errors = reactive({
      email: [],
      code: []
    })
    const onSubmit = (e: Event) => {
      e.preventDefault()
      Object.assign(errors,{
        email:[],code:[]
      })
      Object.assign(errors, validate(formData,[
        {key: 'email', type: 'required', message: '必填'},
        {key: 'email', type: 'pattern', regex: /.+@.+/, message: '必须是邮箱地址'},
        {key: 'code', type: 'required', message: '必填'}
      ]))
    }
    const onClickSendValidationCode = () => {
      console.log('onClickSendValidationCode')
    }
    return () => (
      <MainLayout>{
        {
          title: () => '登录',
          icon: () => <Icon name="left"/>,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="mangosteen" />
                <h1 class={s.appName}>山竹记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem label="邮箱地址" type="text"
                placeholder="请输入邮箱，然后点击发送验证码"
                v-model={formData.code} error={errors.email?.[0]} />
                <FormItem label="验证码" type="validationCode"
                placeholder="请输入六位数字"
                onClick={onClickSendValidationCode} />
              </Form>
            </div>
          )
        }
      }</MainLayout>
    )
  }
})