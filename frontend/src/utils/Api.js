class Api {
  constructor(url){
    this._url = url;
  }

  _checkResponse(res){
    if(res.ok){
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  }

  getUserInformation(){
    return fetch(`${this._url}/users/me`,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type" : "application/json"
      }
    })
    .then((res) => this._checkResponse(res));
  }

  getInitialCards(){
    return fetch(`${this._url}/cards`,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type" : "application/json"
      }
    })
    .then((res) => this._checkResponse(res));
  }
  
  updateUserInfo(data){
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }) 
    .then((res) => this._checkResponse(res));
  }

  addNewCard(data){
    return fetch(`${this._url}/cards`,{
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => this._checkResponse(res));
  }

  deleteCard(id){
    return fetch(`${this._url}/cards/${id}`,{
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type" : "application/json"
      }
    })
    .then((res) => this._checkResponse(res));
  }

  updateAvatar(data){
    return fetch(`${this._url}/users/me/avatar`,{
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        avatar: data.link
      })
    })
    .then((res) => this._checkResponse(res));
  }
  
  changeLikeCardStatus(id, isLiked){
    if(isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type" : "application/json"
        },
      })
      .then((res) => this._checkResponse(res));
    } else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type" : "application/json"
        },
      })
      .then((res) => this._checkResponse(res));
    }
  }
}

const api = new Api("https://api.project.mesto.nomoredomains.work");

export default api;