// React Imports
import React, { lazy, Suspense, Fragment } from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import '../versus/index.js';

// URL SWITCH
//console.log(location.href)
switch (location.href) {
  case 'https://plataformaesports.com': {
    location.href = 'http://www.plataformaesports.com/#/';
  }
  default:
    '';
}

// Main Components
const Home = lazy(() => import('./components/main/home'));

// Team Mail Register
const TeamPlayerRegister = lazy(() =>
  import('./components/main/teamPlayerRegister')
);

// Customers Imports
//import CiudadEsports from './components/customers/ciudadesports/ciudadesports';
const CiudadEsports = lazy(() =>
  import('./components/customers/ciudadesports/ciudadEsports')
);
const AmbaMetropolitanos = lazy(() =>
  import('./components/customers/ambametropolitanos/ambaMetropolitanos')
);
const Copavenadotuerto = lazy(() =>
  import('./components/customers/copavenadotuerto/copavenadotuerto')
);
/*const RosarioJuega = lazy(() =>
  import('./components/customers/rosariojuega/rosariojuega')
);*/

// Games Organizer Imports
const MobileLTournament = lazy(() =>
  import(
    './components/modules/community-module/games/mobile-legends/mobileL-tournament'
  )
);
const LolTournament = lazy(() =>
  import(
    './components/modules/community-module/games/league-of-legends/lol-tournament'
  )
);
const FifaTournament = lazy(() =>
  import('./components/modules/community-module/games/fifa20/fifa-tournament')
);
const PesTournament = lazy(() =>
  import('./components/modules/community-module/games/pes20/pes-tournament')
);
const NbaTournament = lazy(() =>
  import('./components/modules/community-module/games/nba2k/nba2k-tournament')
);
const GtTournament = lazy(() =>
  import(
    './components/modules/community-module/games/gran-turismo/gt-tournament'
  )
);
// Tournament Panel
const TournamentPanel = lazy(() =>
  import('./methods/html/modules/community-module/organizer/tournamentPanel')
);

// Games Tournaments Imports
const FifaOrganizer = lazy(() =>
  import('./components/modules/community-module/games/fifa20/fifa-organizer.js')
);
const PesOrganizer = lazy(() =>
  import('./components/modules/community-module/games/pes20/pes-organizer')
);
const LolOrganizer = lazy(() =>
  import(
    './components/modules/community-module/games/league-of-legends/lol-organizer'
  )
);
const MobileLOrganizer = lazy(() =>
  import(
    './components/modules/community-module/games/mobile-legends/mobileL-organizer'
  )
);
const GtOrganizer = lazy(() =>
  import(
    './components/modules/community-module/games/gran-turismo/gt-organizer'
  )
);

// Users IMPORTS
const Settings = lazy(() => import('./components/user/settings.js'));
const OrganizersAccess = lazy(() =>
  import('./components/user/login/organizersAccess.js')
);

// LEGAL IMPORTS
const TermsAndPolitics = lazy(() =>
  import('./components/main/legal/termsAndPolitics')
);

const App = () => (
  <HashRouter>
    {/* envolvemos nuestra aplicación en el Router --- NOTA: aqui puede usarse el history createBrowserHistory */}
    <Suspense
      fallback={
        <div
          id='loading-div'
          className='loading-div'
          style={{
            background: '#111217',
            color: 'white',
            width: '100vw',
            height: '100vh',
          }}>
          Loading...
        </div>
      }>
      <Switch>
        {/* Main Componets */}
        <Route path='/' component={Home} exact />
        <Route path='/terms-and-politics' component={TermsAndPolitics} exact />
        <Route path='/teamregister' component={TeamPlayerRegister} />
        {/* Customers Components */}
        <Route path='/ciudadesports' component={CiudadEsports} exact />
        <Route path='/ciudadautodromo' component={AmbaMetropolitanos} exact />
        {/*<Route path='/copaciudadrosario' component={RosarioJuega} exact />*/}
        <Route path='/copavenadotuerto' component={Copavenadotuerto} exact />
        {/* Users Components */}
        <Route path='/settings' component={Settings} />
        <Route path='/organizer' component={OrganizersAccess} />
        {/* Games Tournaments */}
        <Route path='/fifa20-tournament' component={FifaTournament} />
        <Route path='/pes20-tournament' component={PesTournament} />
        <Route path='/lol-tournament' component={LolTournament} />
        <Route path='/mobileL-tournament' component={MobileLTournament} />
        <Route path='/NBA2K-tournament' component={NbaTournament} />
        <Route path='/GT-tournament' component={GtTournament} />
        {/* Games Organizer */}
        <Route path='/fifa20-organizer' component={FifaOrganizer} />
        <Route path='/pes20-organizer' component={PesOrganizer} />
        <Route path='/lol-organizer' component={LolOrganizer} />
        <Route path='/mobileL-organizer' component={MobileLOrganizer} />
        <Route path='/NBA2K-organizer' component={MobileLOrganizer} />
        <Route path='/GT-organizer' component={GtOrganizer} />

        {/* Tournaments Panel */}

        {<Route path='/tournament-panel' component={TournamentPanel} />}
      </Switch>
    </Suspense>
  </HashRouter>
);
//export default userState

render(<App />, document.getElementById('root'));
