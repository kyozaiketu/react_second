/* 
    接口类型
    |-data object 响应数据
        |-channels ChannelItem[] 响应频道列表
            |-id integer 频道id
            |-name string 频道名称
    |-message string 响应
*/

import { http } from '@/utils'
// 1,定义泛型
// 泛型抽出去,方便其他接口使用
import type { ResType } from './shared'
// type ResType<T> = {
//     message: string,
//     data: T
// }

// 2,定义具体的接口类型
export type ChannelItem = {
    id: number,
    name: string
}

type ChannelRes = {
    channels: ChannelItem[] //channels的类型是ChannelItem[]
}

// 请求频道列表数据:::::::::::::::::::::::::::::::::
export function fetchChannelAPI() {
    return http.request<ResType<ChannelRes>>({
        url: '/channels'
    })
}

// 请求文章列表::::::::::::::::::::::::::::::::::
type ListItem = {
    art_id: string
    title: string
    aut_id: string
    comm_count: number
    pubdate: string
    aut_name: string
    is_top: number
    cover: {
        type: number
        images: string[]
    }
}
export type ListRes = {
    results: ListItem[],
    pre_timestamp: string
}
// 参数类型定义
export type ListParams = {
    channel_id: string
    timestamp: string
}

export function fetchListAPI(params: ListParams) {
    return http.request<ResType<ListRes>>({
        url: '/articles',
        params: params
    })
}