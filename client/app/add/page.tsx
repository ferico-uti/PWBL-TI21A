"use client";

import axios from "axios";
import React, { useState } from "react";

export default function AddPage() {
  // buat state untuk untuk setiap komponen
  const [getNPM, setNPM] = useState("");
  const [getNama, setNama] = useState("");
  const [getTelepon, setTelepon] = useState("");
  const [getJurusan, setJurusan] = useState("");

  // buat arrow function untuk "setPost"
  const setPost = () => {
    // jika ada salah satu komponen tidak diisi
    if (getNPM == "" || getNama == "" || getTelepon == "" || getJurusan == "") {
      alert("Seluruh Data Wajib Diisi !");
    }
    // jika semua komponen diisi
    else {
      // kirim ke service "POST" backend
      axios
        .post(`${process.env.APIMahasiswa}/save`, {
          npm: getNPM,
          nama: getNama,
          telepon: getTelepon,
          jurusan: getJurusan,
        })
        .then((response) => {
          // ambil nilai "message" dari server
          alert(response.data.message);

          // jika nilai "status" = 1
          if (response.data.status == 1) {
            // panggil fungsi "setRefresh"
            setRefresh();
          }
        });
    }
  };

  // buat arrow function untuk "btn_refresh"
  const setRefresh = () => {
    location.reload();
  };

  return (
    <div>
      {/* area komponen */}
      <section className="flex items-center mb-4">
        {/* area label */}
        <section className="w-1/4">
          <label htmlFor="txt_npm">NPM</label>
        </section>

        {/* area input */}
        <section className="w-3/4">
          <input
            type="text"
            name=""
            id="txt_npm"
            className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
            placeholder="Isi Data NPM"
            onChange={(e) => setNPM(e.target.value)}
          />
        </section>
      </section>

      {/* area komponen */}
      <section className="flex items-center mb-4">
        {/* area label */}
        <section className="w-1/4">
          <label htmlFor="txt_nama">Nama Mahasiswa</label>
        </section>

        {/* area input */}
        <section className="w-3/4">
          <input
            type="text"
            name=""
            id="txt_nama"
            className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
            placeholder="Isi Data Nama Mahasiswa"
            onChange={(e) => setNama(e.target.value)}
          />
        </section>
      </section>

      {/* area komponen */}
      <section className="flex items-center mb-4">
        {/* area label */}
        <section className="w-1/4">
          <label htmlFor="txt_telepon">Telepon Mahasiswa</label>
        </section>

        {/* area input */}
        <section className="w-3/4">
          <input
            type="text"
            name=""
            id="txt_telepon"
            className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
            placeholder="Isi Data Telepon Mahasiswa"
            onChange={(e) => setTelepon(e.target.value)}
          />
        </section>
      </section>

      {/* area komponen */}
      <section className="flex items-center mb-4">
        {/* area label */}
        <section className="w-1/4">
          <label htmlFor="cbo_jurusan">Jurusan Mahasiswa</label>
        </section>

        {/* area input */}
        <section className="w-3/4">
          <select
            name=""
            id="cbo_jurusan"
            className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500 bg-white"
            onChange={(e) => setJurusan(e.target.value)}
          >
            <option value="">Pilih Jurusan Mahasiswa</option>
            <option value="Teknologi Informasi">Teknologi Informasi</option>
            <option value="Sistem Informasi">Sistem Informasi</option>
            <option value="Informatika">Informatika</option>
          </select>
        </section>
      </section>

      {/* area komponen */}
      <section className="flex items-center">
        {/* area label */}
        <section className="w-1/4"></section>

        {/* area button */}
        <section className="w-3/4">
          <button
            id="btn_simpan"
            className="mr-1 bg-sky-500 px-5 py-3 w-40 rounded-full text-white active:bg-black active:text-sky-300 text-center"
            onClick={setPost}
          >
            Simpan
          </button>

          <button
            id="btn_refresh"
            className="ml-1 border-2 border-sky-500 px-5 py-3 w-40 rounded-full text-center"
            onClick={setRefresh}
          >
            Refresh
          </button>
        </section>
      </section>
    </div>
  );
}
