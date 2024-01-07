/** @type {import('next').NextConfig} */
const nextConfig = {
    env : {
        APIMahasiswa : "http://localhost:8000/api/mahasiswa",
        APIDosen : "http://localhost:8000/api/dosen",        
    }
}

module.exports = nextConfig
