// Авторизуем пользователя, используя инфу о нем.
const authorize = ({
  default_avatar_id: defaultAvatarId,
  display_name: displayName,
}) => {
  const avatarHtml = `<div class="avatar" style="background-image:url('https://avatars.mds.yandex.net/get-yapic/${defaultAvatarId}/islands-middle')"></div>`;
  const nameHtml = `<div class="name">${displayName}</div>`;

  document.getElementById("auth").innerHTML = `${avatarHtml}${nameHtml}`;
};

// Делаем запрос за инфой о пользователе.
const fetchYandexData = (token) =>
  fetch(`https://login.yandex.ru/info?format=json&oauth_token=${token}`).then(
    (res) => res.json()
  );

window.onload = () => {
  document.getElementById("suggest").onclick = () => {
    YaAuthSuggest.init({
         client_id: '9a9e07e0730a4cc6a380e6a3920b9f6d',
         response_type: 'token',
         redirect_uri: 'https://oauth-master-class-main-dj8n.vercel.app/token.html'
      },
      'https://oauth-master-class-main-dj8n.vercel.app'
   )
        .then(({ handler }) => handler())
        .then(async (data) => {
          const result = await fetchYandexData(data.access_token);

          authorize(result);

          console.log(result, data);
      })
      .catch((error) => console.log("Что-то пошло не так: ", error));


   // .then(({
   //    handler
   // }) => handler())
   // .then(data => console.log('Сообщение с токеном', data))
   // .catch(error => console.log('Обработка ошибки', error));


  };
  document.getElementById("button").onclick = () => {

    YaAuthSuggest.init({
         client_id: '9a9e07e0730a4cc6a380e6a3920b9f6d',
         response_type: 'token',
         redirect_uri: 'https://oauth-master-class-main-dj8n.vercel.app/token.html'
      },
      'https://oauth-master-class-main-dj8n.vercel.app',
      {
          parentId: "buttonContainer",
          view: "button",
          buttonTheme: "red",
          buttonSize: "m",
          buttonBorderRadius: 40,
      }
   )

        .then(({ handler }) => handler())
        .then(async (data) => {
          const result = await fetchYandexData(data.access_token);

          authorize(result);

          console.log(result, data);
      })
      .catch((error) => console.log("Что-то пошло не так: ", error));
  };

    document.getElementById("button3").onclick = () => {

    YaAuthSuggest.init({
         client_id: '9a9e07e0730a4cc6a380e6a3920b9f6d',
         response_type: 'code',
         redirect_uri: 'https://oauth.yandex.ru/verification_code'
      },
      'https://oauth-master-class-main-dj8n.vercel.app',
      {
          parentId: "buttonContainer",
          view: "button",
          buttonTheme: "white",
          buttonSize: "s",
          buttonBorderRadius: 20,
      }
   )

        .then(({ handler }) => handler())
        .then(async (data) => {
          const result = await fetchYandexData(data.access_token);

          authorize(result);

          console.log(result, data);
      })
      .catch((error) => console.log("Что-то пошло не так: ", error));
  };
};
