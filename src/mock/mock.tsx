import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios'

export type Mock = (config: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN')

export const mockItemSummary: Mock = (config) => {
  let result: [number, any],
    summary = 0
    const createRandomAmountAndAddToSum = () => {
      const amount = Math.round(Math.random() * 1000)
      summary += amount
      return amount
    }
  switch (config.params.group_by) {
    case 'happen_at':
      result = [
        200,
        {
          groups: [
            { happen_at: '2023-03-18T00:00:00.000+0800', amount: createRandomAmountAndAddToSum() },
            { happen_at: '2023-03-19T00:00:00.000+0800', amount: createRandomAmountAndAddToSum() },
            { happen_at: '2023-03-20T00:00:00.000+0800', amount: createRandomAmountAndAddToSum() },
            { happen_at: '2023-03-21T00:00:00.000+0800', amount: createRandomAmountAndAddToSum() },
            { happen_at: '2023-03-22T00:00:00.000+0800', amount: createRandomAmountAndAddToSum() },
            { happen_at: '2023-03-23T00:00:00.000+0800', amount: createRandomAmountAndAddToSum() },
            { happen_at: '2023-03-24T00:00:00.000+0800', amount: createRandomAmountAndAddToSum() }
          ],
          summary
        }
      ]
      break

    default:
      result = [
        200,
        {
          groups: [
            { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: createRandomAmountAndAddToSum() },
            { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: createRandomAmountAndAddToSum() },
            { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: createRandomAmountAndAddToSum() }
          ],
          summary
        }
      ]
      break
  }
  return result
}

export const mockItemIndexBalance: Mock = (config) => {
  return [
    200,
    {
      expenses: 9900,
      income: 9900,
      balance: 0
    }
  ]
}

export const mockItemIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPaper = (page = 1) => ({
    page,
    per_page,
    count
  })
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs
  })
  const createItem = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      user_id: createId(),
      amount: Math.floor(Math.random() * 10000),
      tag_ids: [createId()],
      tags: [createTag()],
      happen_at: faker.date.past().toISOString(),
      kind: config.params.kind
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createItem(n),
    pager: createPaper(page),
    summary: {
      expenses: 9900,
      income: 9900,
      balance: 0
    }
  })
  if (!page || page === 1) {
    return [200, createBody(25)]
  } else if (page === 2) {
    return [200, createBody(1)]
  } else {
    return [200, {}]
  }
}

export const mockTagEdit: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs
  })
  return [200, { resource: createTag() }]
}

export const mockTagShow: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs
  })
  return [200, { resource: createTag() }]
}

export const mockSession: Mock = (config) => {
  return [
    200,
    {
      jwt: faker.random.word()
    }
  ]
}

let id = 0
const createId = () => {
  id += 1
  return id
}

export const mockItemCreate: Mock = (config) => {
  return [
    200,
    {
      resource: {
        id: 2264,
        user_id: 1312,
        amount: 9990,
        note: null,
        tag_ids: [1204],
        happen_at: '2020-10-29T16:00:00.000Z',
        created_at: '2020-10-29T16:00:00.000Z',
        updated_at: '2020-10-29T16:00:00.000Z',
        kind: 'expenses'
      }
    }
  ]
}

export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPaper = (page = 1) => ({
    page,
    per_page,
    count
  })
  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: config.params.kind,
      ...attrs
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createTag(n),
    pager: createPaper(page)
  })

  if (kind === 'expenses' && (!page || page === 1)) {
    return [200, createBody(25)]
  } else if (kind === 'expenses' && page === 2) {
    return [200, createBody(1)]
  } else if (kind === 'income' && (!page || page === 1)) {
    return [200, createBody(25)]
  } else {
    return [200, createBody(1)]
  }
}
