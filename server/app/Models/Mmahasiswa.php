<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Mmahasiswa extends Model
{
    // use HasFactory;

    // buat fungsi untuk ambil data "tb_mahasiswa"
    function getData()
    {
        // tampilkan data dari "tb_mahasiswa" 
        $query = DB::table("tb_mahasiswa")
            ->select("id AS id_mahasiswa", "npm AS npm_mahasiswa", "nama AS nama_mahasiswa", "telepon AS telepon_mahasiswa", "jurusan AS jurusan_mahasiswa")
            ->orderBy("id")
            ->get();
        // mengirim hasil variabel "query" ke controller "Mahasiswa"
        return $query;
    }

    // buat fungsi untuk pencarian data
    function searchData($keyword)
    {
        // tampilkan data dari "tb_mahasiswa" 
        $query = DB::table("tb_mahasiswa")
            ->select("id AS id_mahasiswa", "npm AS npm_mahasiswa", "nama AS nama_mahasiswa", "telepon AS telepon_mahasiswa", "jurusan AS jurusan_mahasiswa")
            ->where('npm', "$keyword")
            //  ->orWhere("nama","LIKE","%$keyword%")
            // ->orWhereRaw("REPLACE(nama,' ','') LIKE REPLACE('%$keyword%',' ','')")                
            ->orWhere(DB::raw("REPLACE(nama,' ','')"), "LIKE", DB::raw("REPLACE('%$keyword%',' ','')"))
            ->orWhere("telepon", "$keyword")
            ->orWhere("jurusan", "LIKE", "%$keyword%")
            ->orderBy("id")
            ->get();
        // mengirim hasil variabel "query" ke controller "Mahasiswa"
        return $query;
    }

    // buat fungsi detail data
    function detailData($id)
    {
        // tampilkan data dari "tb_mahasiswa" 
        $query = DB::table("tb_mahasiswa")
            ->select("id AS id_mahasiswa", "npm AS npm_mahasiswa", "nama AS nama_mahasiswa", "telepon AS telepon_mahasiswa", "jurusan AS jurusan_mahasiswa")
            // ->where(DB::raw("TO_BASE64(npm)"), "$id")            
            ->where(DB::raw("TO_BASE64(MD5(npm))"), "$id")
            ->get();
        // mengirim hasil variabel "query" ke controller "Mahasiswa"
        return $query;
    }

    // buat fungsi untuk hapus data
    function deleteData($id)
    {
        // perintah untuk hapus data
        DB::table("tb_mahasiswa")
            ->where(DB::raw("TO_BASE64(MD5(npm))"), "$id")
            ->delete();
    }

    // buat fungsi untuk simpan data
    function saveData($npm, $nama, $telepon, $jurusan)
    {
        // ambil data
        // "npm" = nama field
        // "$npm" = nama parameter
        $result = [
            "npm" => $npm,
            "nama" => $nama,
            "telepon" => $telepon,
            "jurusan" => $jurusan,
        ];
        // perintah simpan data
        DB::table("tb_mahasiswa")
            ->insert($result);
    }

    function checkUpdateData($npm, $id)
    {
        // tampilkan data dari "tb_mahasiswa" 
        $query = DB::table("tb_mahasiswa")
            ->select("id AS id_mahasiswa", "npm AS npm_mahasiswa", "nama AS nama_mahasiswa", "telepon AS telepon_mahasiswa", "jurusan AS jurusan_mahasiswa")
            // ->where(DB::raw("TO_BASE64(npm)"), "$id")            
->where(DB::raw("TO_BASE64(MD5(npm))"),"!=", "$id")
->where("npm","$npm")
            ->get();
        // mengirim hasil variabel "query" ke controller "Mahasiswa"
        return $query;        
    }

    // fungsi untuk ubah data
    function updateData($npm, $nama, $telepon, $jurusan, $id)
    {
        // ambil data
        // "npm" = nama field
        // "$npm" = nama parameter
        $result = [
            "npm" => $npm,
            "nama" => $nama,
            "telepon" => $telepon,
            "jurusan" => $jurusan,
        ];
        
        // perintah untuk ubah data
        DB::table("tb_mahasiswa")
            ->where(DB::raw("TO_BASE64(MD5(npm))"), "$id")
            ->update($result);        
    }
}
