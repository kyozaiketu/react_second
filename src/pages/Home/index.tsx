import "./style.css"
import { Tabs } from 'antd-mobile'
import useTabs from "./useTabs"
import HomeList from './HomeList'

const Home = () => {
    // 数据用hooks管理
    const { channelList } = useTabs()
    // 页面
    return (
        <div>
            <div className='tabContainer'>
                <Tabs>
                    {
                        channelList.map(item => (
                            <Tabs.Tab title={item.name} key={item.id}>
                                <HomeList channelId={'' +item.id}/>
                                <div className="listContaine">
                                    <HomeList channelId={'' + item.id} />
                                </div>
                            </Tabs.Tab>
                        ))}
                </Tabs>
            </div>
        </div>
    )
}

export default Home