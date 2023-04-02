import { defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBool } from '../hooks/useBool'
import { MainLayout } from '../layouts/MainLayout'
import { BackIcon } from '../shared/BackIcon'
import { Button } from '../shared/Button'
import { Form, FormItem } from '../shared/Form'
import { http } from '../shared/Http'
import { Icon } from '../shared/Icon'
import { hasError, validate } from '../shared/validate'
import { useMeStore } from '../stores/useMeStore'
import s from './SignInPage.module.scss'
export const SignInPage = defineComponent({
  setup: (props, context) => {
    const meStore = useMeStore()
    const formData = reactive({
      email: 'laihongjiang@foxmail.com',
      code: '123456'
    })
    const errors = reactive({
      email: [],
      code: []
    })
    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors)
      }
      throw error
    }
    const refValidationCode = ref<any>()
    const router = useRouter()
    const route = useRoute()
    const onSubmit = async (e: Event) => {
      e.preventDefault()
      Object.assign(errors, {
        email: [],
        code: []
      })
      Object.assign(
        errors,
        validate(formData, [
          { key: 'email', type: 'required', message: '必填' },
          {
            key: 'email',
            type: 'pattern',
            regex: /.+@.+/,
            message: '必须是邮箱地址'
          },
          { key: 'code', type: 'required', message: '必填' }
        ])
      )
      if (!hasError(errors)) {
        const response = await http.post<{ jwt: string }>('/session', formData, { _autoLoading: true }).catch(onError)
        localStorage.setItem('jwt', response.data.jwt)
        const returnTo = route.query.return_to?.toString()
        meStore.refreshMe()
        router.push(returnTo || '/')
      }
    }
    const { ref: refDisabled, toggle, on: disabled, off: enable } = useBool(false)
    const onClickSendValidationCode = async () => {
      disabled()
      const response = await http
        .post('/validation_codes', { email: formData.email }, { _autoLoading: true })
        .catch(onError)
        .finally(enable)
      // 成功
      refValidationCode.value.startCount()
    }
    return () => (
      <MainLayout>
        {{
          title: () => '登录',
          icon: () => <BackIcon />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="mangosteen" />
                <h1 class={s.appName}>山竹记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  placeholder="请输入邮箱，然后点击发送验证码"
                  v-model={formData.email}
                  error={errors.email?.[0]}
                />
                <FormItem
                  ref={refValidationCode}
                  label="验证码"
                  type="validationCode"
                  v-model={formData.code}
                  error={errors.code?.[0]}
                  placeholder="请输入六位数字"
                  disabled={refDisabled.value}
                  countForm={60}
                  onClick={onClickSendValidationCode}
                />
                <FormItem style={{ paddingTop: '96px' }}>
                  <Button type="submit">登录</Button>
                </FormItem>
              </Form>
            </div>
          )
        }}
      </MainLayout>
    )
  }
})

export default SignInPage
