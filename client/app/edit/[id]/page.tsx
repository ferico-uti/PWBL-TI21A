"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useSWR from "swr";
import { Md5 } from "ts-md5";

// buat fungsi untuk fetchData
const fetchData = (url: string) =>
  fetch(url).then((response) => response.json());

export default function EditPage({ params }: { params: { id: string } }) {
  // buat variabel object untuk menampilkan detail data
  const { data } = useSWR(
    `${process.env.APIMahasiswa}/detail/${params.id}`,
    fetchData
  );

  // buat hook "useRef" untuk pengambilan nilai setiap komponen
  const ref_npm = useRef<HTMLInputElement>(null);
  const ref_nama = useRef<HTMLInputElement>(null);
  const ref_telepon = useRef<HTMLInputElement>(null);
  const ref_jurusan = useRef<HTMLSelectElement>(null);

  // buat arrow function untuk "setPut"
  const setPut = () => {
    // jika ada salah satu komponen tidak diisi
    if (
      ref_npm?.current?.value == "" ||
      ref_nama?.current?.value == "" ||
      ref_telepon?.current?.value == "" ||
      ref_jurusan?.current?.value == ""
    ) {
      alert("Seluruh Data Wajib Diisi !");
    }
    // jika semua komponen diisi
    else {
      // kirim ke service "PUT" backend
      axios
        .put(`${process.env.APIMahasiswa}/update/${params.id}`, {
          npm: ref_npm?.current?.value,
          nama: ref_nama?.current?.value,
          telepon: ref_telepon?.current?.value,
          jurusan: ref_jurusan?.current?.value,
        })
        .then((response) => {
          // ambil nilai "message" dari server
          alert(response.data.message);

          // jika nilai "status" = 1
          if (response.data.status == 1) {
            // refresh halaman dengan URL baru
            let npm_hash: any = ref_npm?.current?.value;
            location.replace(`/edit/${btoa(Md5.hashStr(npm_hash))}`);
          }
        });
    }
  };

  // buat arrow function untuk "btn_refresh"
  const setRefresh = () => {
    // reload halaman
    location.reload();
  };

  return (
    <div>
      {
        // jika detail data tidak ditemukan
        data && data.mahasiswa.length == 0 ? (
          <h1>Data Tidak Ditemukan !</h1>
        ) : (
          // jika detail data ditemukan
          data &&
          data.mahasiswa.map((item: any, index: number) => (
            <section key={index}>
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
                    defaultValue={item.npm_mahasiswa}
                    ref={ref_npm}
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
                    defaultValue={item.nama_mahasiswa}
                    ref={ref_nama}
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
                    defaultValue={item.telepon_mahasiswa}
                    ref={ref_telepon}
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
                    defaultValue={item.jurusan_mahasiswa}
                    ref={ref_jurusan}
                  >
                    <option value="">Pilih Jurusan Mahasiswa</option>
                    <option value="Teknologi Informasi">
                      Teknologi Informasi
                    </option>
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
                    id="btn_ubah"
                    className="mr-1 bg-sky-500 px-5 py-3 w-40 rounded-full text-white active:bg-black active:text-sky-300 text-center"
                    onClick={setPut}
                  >
                    Ubah
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
            </section>
          ))
        )
      }
    </div>
  );
}
