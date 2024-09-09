import { useState, useEffect } from "react"
import {fetchChannelAPI}  from '@/apis/list'
import type { ChannelItem } from '@/apis/list'


// 获取频道列表数据接口  从组件接口中引入
export default function useTabs() {
    // channelList : ChannelItem[] 
    const [channelList, setChannelList] = useState<ChannelItem[]>([])

    useEffect(() => {
        const getChannelList = async () => {
            try {
                const res = await fetchChannelAPI()
                // console.log(res);
                setChannelList(res.data.data.channels)
                
            } catch (error) {
                throw new Error('获取频道列表失败')
            }
        }
        getChannelList()
    }, [])

    return {
        channelList
    }
}
