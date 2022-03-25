import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/characters");
  }

  get(name) {
    return http.get(`/characters/${name}`);
  }

  create(data) {
    return http.post("/characters", data);
  }

  update(name, data) {
    return http.put(`/characters/${name}`, data);
  }

  delete(name) {
    return http.delete(`/characters/${name}`);
  }

  deleteAll() {
    return http.delete(`/characters`);
  }

  findByTitle(title) {
    return http.get(`/characters?title=${title}`);
  }
}

export default new TutorialDataService();