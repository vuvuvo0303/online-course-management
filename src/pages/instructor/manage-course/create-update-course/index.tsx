import { Category, Course } from "../../../../models";
import { API_CREATE_COURSE, API_GET_COURSE, API_UPDATE_COURSE } from "../../../../consts";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Image, Input, message, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { getCategories, axiosInstance } from "../../../../services";
import { TinyMCEEditorComponent, LoadingComponent, CustomBreadcrumb, ButtonFormItem } from "../../../../components";
import { formItemLayout } from "../../../../layout/form"
import type { GetProp, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getBase64, uploadFile } from "../../../../utils";
import { RuleObject } from "antd/es/form";
import { StoreValue } from "antd/es/form/interface";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const InstructorCreateCourse: React.FC = () => {
  // const [des, setDes] = useState<string>("");
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { _id } = useParams<{ _id: string; id: string }>();
  const [form] = useForm();
  const token = localStorage.getItem("token");
  const [content, setContent] = useState<string>("Enter something here");
  const ValidHttpUrl = (string: string): boolean => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  const validateUrl = (_: RuleObject, value: StoreValue): Promise<void> => {
    return ValidHttpUrl(value as string)
      ? Promise.resolve()
      : Promise.reject("This is not a valid video URL");
  }

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`${API_GET_COURSE}/${_id}`);
        if (response) {
          const data = response.data;
          form.setFieldsValue({
            name: data?.name,
            category_id: data?.category_id,
            description: data?.description,
            status: data?.status,
            video_url: data?.video_url,
            image_url: data?.image_url,
            price: data?.price,
            discount: data?.discount,
          });
          if (data.image_url) {
            setFileList([
              {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: data.image_url,
              },
            ]);
          }
          setVideoUrl(data.video_url);
          setContent(data.description);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error occurred: ", error);
      }
    };
    if (_id) {
      fetchCourse();
    }
  }, [_id, form]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCategories = await getCategories();
        const categories = responseCategories.data.pageData;
        setCategories(categories);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching categories: ", error);
      }
    };
    fetchData();
  }, [token]);

  if (loading) {
    return <LoadingComponent />;
  }

  function isValidHttpUrl(string: string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  const onFinish = async (values: Course) => {
    console.log("values: ", values)
    setLoading(true);
    try {
      if (typeof values.price === "string") {
        values.price = parseFloat(values.price);
      }
      if (typeof values.discount === "string") {
        values.discount = parseFloat(values.discount);
      }
      values.content = content;
      // Check and upload new image if exists
      let imageUrl = "";
      if (fileList.length > 0) {
        const file = fileList[0];
        if (file.originFileObj) {
          imageUrl = await uploadFile(file.originFileObj as File);
        }
      }
      values.image_url = imageUrl || values.image_url; // Use new image URL if uploaded, otherwise use the existing one

      if (_id) { //update course
        try {
          const res = await axiosInstance.put(`${API_UPDATE_COURSE}/${_id}`, values);
          if (res) {
            message.success("Update Course Successfully");
            navigate(`/instructor/manage-courses`);
          }
        } catch (error) {
          console.log('error: ', error)
        }
      } else {
        if (!values.content || values.content === undefined) {
          values.content === ""
        }
        if (!values.video_url || values.content === undefined) {
          values.video_url === ""
        }
        // const res = await createCourseByInstructor(values.name, values.category_id, values.description, values.content, values.video_url, values.image_url
        //   , values.price, values.discount
        // )

        try {
          const res = await axiosInstance.post(API_CREATE_COURSE, values);
          if (res) {
            message.success("Create Course Successfully");
            navigate(`/instructor/manage-courses`);
          }
          console.log(res);
        } catch (error) {
          console.log('error: ', error)
        }
      }
    } catch (error) {
      // message.error("An error occurred while saving the course. Please try again.");
      console.error("Error saving course: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = (value: string) => {
    setContent(value);
  };
  const handleSetVideoUrl = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVideoUrl(e.target.value);
  };
  return (
    <>
      <CustomBreadcrumb />
      <h1 className="text-center">{_id ? "Update Course" : "Create Course"}</h1>

      <div className="flex justify-center items-center h-full mt-10">
        <Form {...formItemLayout} onFinish={onFinish} form={form} variant="filled" className="w-full max-w-6xl bg-white p-8 rounded shadow">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input the course name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select>
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Description"
            rules={[{ required: true, message: "Please select a description!" }]}
            name="description">
            <Input.TextArea />
          </Form.Item>
          {(
            <Form.Item
              label="Content (optional)"
              name="content"
              rules={[{ required: false, message: "Please input course content!" }]}
              initialValue={content}
            >
              <TinyMCEEditorComponent value={content}
                onEditorChange={handleEditorChange}
              />
            </Form.Item>
          )}
          <Form.Item
            label="Video URL"
            name="video_url"
            rules={[
              { required: true, message: "Please input a video URL!" },
              { validator: validateUrl },
            ]}
          >
            <Input onChange={handleSetVideoUrl} />
          </Form.Item>

          {isValidHttpUrl(videoUrl) && (
            <div className="flex justify-end mb-5">
              <iframe
                width="400"
                height="200"
                src={videoUrl}
                title="Video preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          {
            !_id && (
              <Form.Item label="Image (optional)" name="image_url">
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
            )
          }
          <Form.Item
            label="Price (VND)"
            name="price"
            rules={[
              { required: true, message: "Please input the price!" },
              {
                validator: (_, value) =>
                  value > 1000 ? Promise.resolve() : Promise.reject("Price must be greater than 1000!"),
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Discount" name="discount" rules={[{ required: true, message: "Please input a discount!" },
          {
            validator: (_, value) =>
              value <= 100 && value >= 0 ? Promise.resolve() : Promise.reject(" Discount must be greater than or equal to 0 and less than or equal to 100 !"),
          },
          ]}>
            <Input type="number" />
          </Form.Item>
          <ButtonFormItem buttonText="Submit" htmlType="submit" loading={loading} />
        </Form>
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </div>
    </>
  );
};

export default InstructorCreateCourse;