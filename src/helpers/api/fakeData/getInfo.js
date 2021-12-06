const res = {
  status: 200,
  ok: true,
  json: () => {
    return {
      firstName: "fred",
      lastName: "dumont",
      email: "fred.dumont@hotmail.fr",
      image: "http://yes.gustosolutions/api/me/pp",
      language: "fr",
      authToken: "fbdhbfrz",
      client: "Olivia",
      level: "1",
    };
  },
};
export default res;
