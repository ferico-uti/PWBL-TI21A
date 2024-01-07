/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-async-client-component */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { Md5 } from "ts-md5";

// buat fungsi untuk fetchData
const fetchData = (url: string) =>
  fetch(url).then((response) => response.json());

export default function ViewPage() {
  // buat state awal
  const [search, setSearch] = useState("");

  // buat fungsi untuk pencarian
  const searchData = (e: any) => {
    e.preventDefault();

    // isi nilai result dari text cari yang diisi
    const result = e.target[0].value;
    // isi nilai state "setSearch"
    setSearch(result);
  };

  // buat variabel object
  const { data, mutate } = useSWR(
    search == ""
      ? `${process.env.APIMahasiswa}/get`
      : `${process.env.APIMahasiswa}/search/${search}`,
    fetchData
  );

  // buat fungsi untuk hapus data
  const setDelete = (npm: string, nama: string) => {
    // alert(`Data Mahasiswa : ${nama} Ingin Dihapus ?`);

    // konfirmasi hapus data
    // jika tombol "Ok" dipilih
    if (confirm(`Data Mahasiswa : ${nama} Ingin Dihapus ?`) == true) {
      // buat variabel untuk hash "npm"
      let npm_hash = btoa(Md5.hashStr(npm));
      // ambil service "delete" dari service
      fetch(`${process.env.APIMahasiswa}/delete/${npm_hash}`, {
        method: "DELETE",
      })
        // response (format json)
        .then((response) => response.json())
        // result (hasil dari "response")
        .then((result) => {
          alert(result.message);
          // refresh data
          mutate(data);
        })
        // jika proses "fetch" bermasalah
        .catch(() => console.error("Data Gagal Dikirim !"));
    }
  };

  return (
    <div>
      {/* area menu */}
      <nav className="flex justify-center mb-5">
        <Link
          href={"/add"}
          className="mr-1 bg-sky-500 px-5 py-3 w-40 rounded-full text-white active:bg-black active:text-sky-300 text-center"
        >
          Tambah Data
        </Link>
        <a
          href={"/"}
          className="ml-1 border-2 border-sky-500 px-5 py-3 w-40 rounded-full text-center"
        >
          Refresh Data
        </a>
      </nav>

      {/* area pencarian data */}
      <form action="" onSubmit={searchData}>
        <section>
          <input
            type="text"
            name=""
            id=""
            placeholder="Cari Data Mahasiswa"
            className="mr-4 border-2 border-slate-300 px-3 py-2 w-2/5 rounded-lg outline-none focus:border-sky-500"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <button className="bg-sky-500 border-2 border-sky-500 px-3 py-2 w-40 rounded-lg text-white">
            Cari Data
          </button>
        </section>
      </form>

      {!data && (
        <section>
          <section className="flex justify-center">
            <img src="./images/loading.gif" alt="Loading Icon" />
          </section>

          <section className="text-center text-rose-700  flex justify-center">
            Mohon Tunggu...
          </section>
        </section>
      )}

      {/* area isi data */}
      <table className="w-full mt-5">
        {/* judul tabel */}
        <thead>
          <tr>
            <th className="w-1/6 border-2 border-slate-300 bg-black text-white h-10 text-center">
              Aksi
            </th>
            <th className="w-2/12 border-2 border-slate-300 bg-black text-white h-10 text-center">
              NPM
            </th>
            <th className="w-auto border-2 border-slate-300 bg-black text-white h-10 text-center">
              Nama
            </th>
            <th className="w-2/12 border-2 border-slate-300 bg-black text-white h-10 text-center">
              Telepon
            </th>
            <th className="w-1/5 border-2 border-slate-300 bg-black text-white h-10 text-center">
              Jurusan
            </th>
          </tr>
        </thead>

        {/* isi tabel */}
        <tbody>
          {/* tampilkan data mahasiswa dari service getData dalam format object */}

          {
            // jika data tidak ditemukan
            data && data.mahasiswa.length == 0 ? (
              // {/* kondisi ketika data tidak ditemukan */}
              <tr>
                <td
                  colSpan={5}
                  className="border-2 border-slate-300 bg-white text-black h-8 text-center p-1"
                >
                  Data Tidak Ditemukan !
                </td>
              </tr>
            ) : (
              // isi nilai data dan lakukan pengambilan data
              data &&
              data.mahasiswa.map((item: any) => (
                <tr key={item.id_mahasiswa}>
                  <td className="border-2 border-slate-300 bg-white text-black h-8 text-center p-3">
                    <Link
                      href={`/edit/${btoa(Md5.hashStr(item.npm_mahasiswa))}`}
                      className="bg-sky-700 text-white px-3 py-2 rounded-md mr-1"
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </Link>
                    <Link
                      href={"/"}
                      className="bg-rose-700 text-white px-3 py-2 rounded-md ml-1"
                      onClick={(e) =>
                        setDelete(item.npm_mahasiswa, item.nama_mahasiswa)
                      }
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </Link>
                  </td>
                  <td className="border-2 border-slate-300 bg-white text-black h-8 text-center">
                    {item.npm_mahasiswa}
                  </td>
                  <td className="border-2 border-slate-300 bg-white text-black h-8 text-justify">
                    {item.nama_mahasiswa}
                  </td>
                  <td className="border-2 border-slate-300 bg-white text-black h-8 text-center">
                    {item.telepon_mahasiswa}
                  </td>
                  <td className="border-2 border-slate-300 bg-white text-black h-8 text-justify">
                    {item.jurusan_mahasiswa}
                  </td>
                </tr>
              ))
            )
          }
        </tbody>
      </table>
    </div>
  );
}
