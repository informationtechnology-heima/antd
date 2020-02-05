import React from 'react'
import { Card, Row, Col, Select, Alert, Pagination } from 'antd'
import { connect } from 'dva'
const namespace = "image"
@connect(state => {
    return {
        images: state[namespace].page.images,
        count: state[namespace].page.count
    }
}, disp => {
    return ({
        findByType: (page) => {
            disp({
                type: namespace + "/findByType",
                payLoad: {
                    page: page,
                }
            })
        }
    })
})
export default class Image extends React.Component {

    constructor() {
        super()
        this.state = {
            page: {
                index: 1,
                size: 12,
                type: "",
            }
        }
    }
    render = () => {
        let images = this.props.images
            .map((iter, index) => {
                return (
                    <Col span={4} key={iter.fileId}>
                        <Card size="small" title={iter.fileName} extra={<a href="#">删除</a>} style={{ width: "200px" }}>
                            <img src={iter.filePath} style={{
                                width: "100%",
                                height: "100%"
                            }}></img>
                        </Card>
                    </Col>
                )
            });
        let content = [];
        let temContent = [];
        for (let i = 1; i < images.length + 1; i++) {
            temContent.push(images[i - 1])
            if (i != 0 && i % 6 == 0) {
                content.push(<Row gutter={16} key={i} >{temContent}</Row>)
                temContent = []
            } else if (i == images.length) {
                content.push(<Row gutter={16} key={i} >{temContent}</Row>)
            }
        }
        return (
            <React.Fragment>
                <div>
                    <Card title={
                        <React.Fragment>
                            <Select defaultValue="全部" style={{ width: 120 }} onChange={this.selectType}>
                                <Option value="全部">全部</Option>
                                <Option value="高端保洁">高端保洁</Option>
                                <Option value="家居养护">家居养护</Option>
                                <Option value="家庭用品">家庭用品</Option>
                            </Select>
                        </React.Fragment>
                    } extra={<Alert message="为了节省服务器资源，无用照片请及时删除" type="warning" showIcon />}>
                        {content}
                        {/* 分页 */}
                        <Pagination style={{
                            paddingTop: "20px",
                            textAlign: "right"
                        }} defaultCurrent={1} total={this.props.count} onChange={this.nextPage} />
                    </Card>
                </div>
            </React.Fragment>
        )
    }
    componentDidMount = () => {
        this.props.findByType(this.state.page)
    }
    selectType = (type) => {
        let page = this.state.page
        page["type"] = type
        this.props.findByType(page)
        this.setState({
            ...this.state.page,
            type: type
        })
    }
    nextPage = (indexPage) => {
        let page = this.state.page
        page["index"] = indexPage
        this.props.findByType(page)
        this.setState({
            ...this.state.page,
            index: indexPage
        })
    }
}