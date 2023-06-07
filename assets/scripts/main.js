import Navigo from 'navigo';
import common from "./common";
import main from "./routes/main";
import favourites from "./routes/favourites";
import API from "./utils/api";

const ROUTER = new Navigo('/', {strategy: 'ALL'});

const app = async () => {
  API.init();
  common.init(ROUTER);

  ROUTER.on({
    '/': {
      as: 'main',
      uses: (match) => main.init(match)
    },
    '/favourites': {
      as: 'favourites',
      uses: (match) => favourites.init(match)
    },
  }).resolve();

  ROUTER.addLeaveHook('/', (done) => {
    main.destroy();
    done();
  });

  ROUTER.addLeaveHook('favourites', (done) => {
    favourites.destroy();
    done();
  });
};

document.addEventListener('DOMContentLoaded', app);
