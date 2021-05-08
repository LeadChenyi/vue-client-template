import Axios from 'axios'
import BaseURL from '../baseURL'
import './interceptors'

const Request = (options) => {
    return new Promise((resolve,reject)=>{
        Axios({
            baseURL:options.baseURL || BaseURL.v2,
            url:options.url,
            method:options.method || "get",
            data:options.data,
            headers:options.headers || {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
            }
        }).then(res => {
            resolve(res);
        }).catch(err => { 
            reject(err);
        });
    })
}

export default {
    photo:{
        async getPhotos(){
            return await Request({baseURL:BaseURL.v3,url:'/photos'});
        },
        async getPhotoById(albumId = 1){
            return await Request({baseURL:BaseURL.v3,url:`/photos?albumId=${albumId}`});
        }
    },
    index:{
        getProjects(){
            return Request({baseURL:BaseURL.v1,url:'/index/projects'});
        },        
        getJournals(){
            return Request({baseURL:BaseURL.v1,url:'/index/journals'});
        },
        getAlbums(){
            return Request({baseURL:BaseURL.v1,url:'/index/albums'});
        }
    }
};