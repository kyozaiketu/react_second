import { Image, List,InfiniteScroll } from 'antd-mobile'
// mock数据
// import { users } from './users'
import { useState, useEffect } from 'react'
import { ListRes, fetchListAPI } from '@/apis/list'

/*  
    组件接收导航栏父组件传递过来的参数,
    通过props接收,ts类型注解来约束props的类型
    副作用函数 useEffect 依赖项指定传来的参数,当参数bu变的时候,重新请求接口数据
*/
type Props = {
    channelId: string
}

const HomeList = (props:Props) => {
    const { channelId } = props //解构写法 
    const [listRes, setListRes] = useState<ListRes>({
        results: [],
        pre_timestamp: '' + new Date().getTime(),
    })

    useEffect(() => {
        const getList = async () => {
            try {
                const res = await fetchListAPI({
                    channel_id:channelId,
                    timestamp: '' + new Date().getTime(),
                })
                setListRes({
                    results:res.data.data.results,
                    pre_timestamp:res.data.data.pre_timestamp,
                })   
            } catch (error) {
                throw new Error('获取列表失败')
            }
        }
        getList()
    },[channelId])
    // 加载下一页的核心逻辑
    const loadMore = async () => {
        console.log('加载更多');
        try {
            const res = await fetchListAPI({
                channel_id:channelId,
                timestamp: listRes.pre_timestamp,
            })
            // 拼接新数据,+存储下一次请求的时间戳
            setListRes({
                results:[...listRes.results,...res.data.data.results],
                pre_timestamp:res.data.data.pre_timestamp,
            })  
            // 停止监听
            if (res.data.data.results.length === 0) {
                setHasMore(false)
            } 
        } catch (error) {
            throw new Error('获取列表失败')
        }
        
        
    }

    const [hasMore, setHasMore] = useState(true)

    return (
        <>
            <List>
                {listRes.results.map((item) => (
                    <List.Item
                        key={item.art_id}
                        prefix={
                            <Image
                                src={item.cover.images?.[0]}
                                style={{ borderRadius: 20 }}
                                fit="cover"
                                width={40}
                                height={40}
                            />
                        }
                        description={item.pubdate}
                    >
                        {item.title}
                    </List.Item> 
                ))}
            </List>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10} />
        </>
    )
}

export default HomeList