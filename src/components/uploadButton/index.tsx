import { PlusOutlined } from '@ant-design/icons'

const UploadButton: React.FC = () => {
    return (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>

    )
}

export default UploadButton