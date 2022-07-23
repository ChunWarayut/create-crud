import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const formEl = useRef();
  const [data, setData] = useState([]);
  const [formState, setFormState] = useState(
    {
      _id: '',
      name: "",
      nickname: "",
      tel: "",
      age: '',
      address: '',
    }
  )

  useEffect(() => {
    readData();
  }, []);


  const readDataById = async (id) => {
    await axios({
      method: "get",
      url: '/api/user/' + id
    }).then(res => {
      formEl.current.name.value = res.data.name;
      formEl.current.nickname.value = res.data.nickname;
      formEl.current.tel.value = res.data.tel;
      formEl.current.age.value = res.data.age;
      formEl.current.address.value = res.data.address;
      setFormState(res.data);
    })
  }

  const readData = async () => {
    await axios({
      method: "get",
      url: '/api/user/'
    }).then(res => {
      setData(res.data);
    })
  }

  const deleteUserById = async (id) => {
    try {
      await axios({
        method: "delete",
        url: '/api/user/' + id
      })
      await readData();
      alert('ลบข้อมูลสำเร็จนะจ๊ะ')
    } catch (error) {
      alert("Error: นะครับ");
    }
  }

  return (
    <div>
      {inputData()}
      {getData()}
    </div>
  )

  function getData() {
    return <section id="read-data">
      <h1>ข้อมูลทั้งหมด</h1>

      <ol>
        {data.map((e, index) => (
          <li key={e._id}>
            {e.name}
            <button onClick={() => readDataById(e._id)}>Edit</button>
            <button onClick={() => deleteUserById(e._id)}>Delete</button>
            <ul>
              <li>name: {e.name}</li>
              <li>nickname: {e.nickname}</li>
              <li>tel: {e.tel}</li>
              <li>age: {e.age}</li>
              <li>address: {e.address}</li>
            </ul>
          </li>
        ))}
      </ol>
    </section>;
  }

  function inputData() {
    return <section id="input-data">
      <h1>{formState?._id ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'}</h1>
      <form ref={formEl} onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target;

        if (!form.name.value) {
          alert('กรุณากรอกชื่อนะครับ');
          return
        }

        if (!form.nickname.value) {
          alert('กรุณากรอกชื่อเล่นนะครับ');
          return
        }

        if (!form.tel.value) {
          alert('กรุณากรอกเบอร์นะครับ');
          return
        }

        if (!form.age.value) {
          alert('กรุณากรอกอายุนะครับ');
          return
        }

        if (!form.address.value) {
          alert('กรุณากรอกที่อยู่นะครับ');
          return
        }

        try {
          await axios({
            method: formState?._id ? "PUT" : "POST",
            url: formState?._id ? "/api/user/" + formState._id : "/api/user/",
            data: {
              name: form.name.value,
              nickname: form.nickname.value,
              tel: form.tel.value,
              address: form.address.value,
              age: form.age.value,
            }
          });
          setFormState({});
          setData([]);
          form.reset();
          await readData();
          alert("정상적으로 전송되었습니다.");
        } catch (error) {
          alert("ERROR: จัดการข้อมูลไม่สำเร็จ ");
        }
      }}>
        <label>name</label> <input type="text" name="name" /> <br />
        <label>nickname</label> <input type="text" name="nickname" /> <br />
        <label>tel</label> <input type="tel" name="tel" /> <br />
        <label>address</label> <textarea name="address" /> <br />
        <label>age</label> <input type="number" name="age" /> <br />
        <button type="submit"> SAVE </button>
        <button type="reset"> RESET </button>
      </form>
    </section>;
  }
}
