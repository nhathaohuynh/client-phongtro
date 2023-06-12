import React, { useEffect, useState } from "react";
import "./create_post.scss";
import { Select } from "../../../components";
import {
  apiGetProvincesVietNam,
  apiGetDistricts,
  apiGetWards,
} from "../../../services/user";
import { useSelector } from "react-redux";
import { AiFillCamera } from "react-icons/ai";

function CreatePost() {
  const { categories } = useSelector((state) => state.app);
  const { userData } = useSelector((state) => state.user);
  const [value, setValue] = useState({
    province: "",
    province_id: "",
    district: "",
    district_id: "",
    ward: "",
    ward_id: "",
  });
  const [dataForm, setDataForm] = useState({
    address: "",
    category: "",
    phone: userData?.phone,
    name: userData?.name || userData?.username,
    target: "",
  });
  const [procinves, setProcinves] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [ward, setWards] = useState([]);
  const sex = [
    {
      value: "Male",
    },
    {
      value: "Female",
    },
    {
      value: "All",
    },
  ];
  const handleClickOption = (e, value) => {
    e.preventDefault();
    setValue((prev) => ({
      ...prev,
      ...value,
    }));
  };

  const handleClickDataForm = (e, value) => {
    e.preventDefault();
    setDataForm((prev) => ({
      ...prev,
      ...value,
    }));
  };

  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const response = await apiGetProvincesVietNam();
        if (response.status === 200) setProcinves(response?.data?.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProvince();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        if (value?.province_id) {
          const response = await apiGetDistricts(value?.province_id);
          if (response.status === 200) {
            setDistricts(response?.data.results);
            setDataForm((prev) => ({
              ...prev,
              address: `${value?.ward ? value?.ward : ""} ${
                value?.district ? value?.district : ""
              } ${value?.province ? value?.province : ""}`,
            }));
          }
        }

        if (value?.province_id && value?.district_id) {
          const response = await apiGetWards(value?.district_id);
          if (response.status === 200) {
            setWards(response?.data.results);
            setDataForm((prev) => ({
              ...prev,
              address: `${value?.ward ? value?.ward : " "} ${
                value?.district ? value?.district : " "
              } ${value?.province ? value?.province : " "}`,
            }));
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDistricts();
  }, [value]);

  return (
    <div className="create_post">
      <h3 className="create_post_title">Đăng tin mới</h3>
      <hr />
      <div className="create_post_content">
        <div className="create_post_detail">
          <div className="create_post_overview">
            <h5 className="create_post_subtitle">Địa chỉ cho thuê</h5>
            <div className="create_post_address">
              <Select
                label="Tỉnh/Thành phố"
                name="province"
                value={value.province}
                onClick={handleClickOption}
                data={procinves}
              ></Select>
              <Select
                label="Quận/Huyện"
                name="district"
                value={value.district}
                onClick={handleClickOption}
                disable={!value.province_id}
                data={districts}
              ></Select>
              <Select
                label="Phường/Xã"
                name="ward"
                value={value.ward}
                onClick={handleClickOption}
                disable={!value.district_id}
                data={ward}
              ></Select>
            </div>
            <div className="create_post_item">
              <InputReadOnly
                value={dataForm.address}
                title={"Địa chỉ chính xác"}
              ></InputReadOnly>
            </div>
          </div>
          <div className="create_post_infoPost">
            <h5 className="create_post_subtitle">Thông tin miêu tả</h5>
            <Select
              label="Loại chuyên mục"
              name="category"
              value={dataForm.category}
              onClick={handleClickDataForm}
              data={categories}
              normal
            ></Select>
            <InputForm
              input
              title={"Tiêu đề"}
              name="title"
              type="text"
            ></InputForm>
            <InputForm textArea title="Nội dung miêu tả" name="des"></InputForm>
            <InputReadOnly
              value={dataForm?.name}
              title={"Thông tin liên lạc"}
              normal
            ></InputReadOnly>
            <InputReadOnly
              value={dataForm?.phone}
              title={"Điện thoại"}
              normal
            ></InputReadOnly>
            <InputForm
              input
              button
              unit="đồng"
              title="Giá cho thuê"
              name="price"
              normal
              type="text"
            ></InputForm>
            <InputForm
              input
              button
              unit="m²"
              title="Diện tích"
              name="area"
              normal
              type="text"
            ></InputForm>
            <Select
              label="Đối tượng cho thuê"
              name="target"
              value={dataForm.target}
              onClick={handleClickDataForm}
              data={sex}
              normal
            ></Select>
            <InputForm
              input
              title="Hình ảnh"
              name="image"
              type="file"
              icon={<AiFillCamera size={80} />}
            ></InputForm>
          </div>
        </div>
        <div className="create_post_map">this is maps</div>
      </div>
    </div>
  );
}

const InputForm = ({
  type,
  title,
  name,
  textArea,
  input,
  button,
  normal,
  unit,
  icon,
}) => {
  return (
    <div
      className={`create_post_form ${normal ? "halfRadius" : ""}`}
      style={{ width: normal && "50%" }}
    >
      <label htmlFor={name}>{title}</label>
      <div className={`create_post_wrapInput ${normal ? "halfRadius" : ""}`}>
        {textArea ? (
          <textarea
            className="create_post_input"
            name={name}
            rows="10"
            cols="50"
            id={name}
          ></textarea>
        ) : null}
        {input ? (
          <input
            className="create_post_input"
            type={type}
            name={name}
            id={name}
          />
        ) : null}
        {button ? <button>{unit}</button> : null}
        {type === "file" ? (
          <label htmlFor={name} className="create_post_inputFile">
            <span className="inputFile_icon">{icon}</span>
            <span>{title}</span>
          </label>
        ) : null}
      </div>
    </div>
  );
};

const InputReadOnly = ({ value, title, normal }) => {
  return (
    <div className="create_post_item" style={{ width: normal && "50%" }}>
      <span className="create_post_exactly_title">{title}</span>
      <input
        className="create_post_showAddress"
        type="text"
        readOnly
        value={value}
      />
    </div>
  );
};

export default CreatePost;
