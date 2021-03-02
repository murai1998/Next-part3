import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './header.module.css'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header () {
  const [ session, loading ] = useSession()
  
  return (
    <header id='header' style={{padding: '0.5em 0'}}>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p className={`nojs-show ${(!session && loading) ? styles.loading : styles.loaded}`}>
          {!session && <>
            <span className={styles.notSignedInText}>You are not signed in</span>
            <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
          </>}
          {session && <>
   
              <div><nav>
        <ul className={styles.navItems}>
  
        <StyledBreadcrumb
        component="a"
        style={{height: '100%', background: '#fff', paddingBottom: '1em'}}
        label={<div style={{fontWeight: 700}}><span style={{fontSize:'0.9em'}}>Signed in as</span><br></br><span style={{color: 'rgb(63, 81, 181)', fontSize: '1.1em'}}> {session.user.email || session.user.name}</span></div>}
        icon={ session.user.image && <span style={{backgroundImage: `url(${session.user.image})` }} className={styles.avatar}/>}
      />
<div style={{display: 'inlineFlex',    alignItems: 'center'}}>
      <StyledBreadcrumb
        component="a"
        href="/"
        style={{marginTop: '1em',  marginLeft: '1em'}}
        label="Home"
        icon={<HomeIcon style={{color: '#3f51b5'}} fontSize="large" />}
      />


      <StyledBreadcrumb  style={{marginTop: '1em',  marginLeft: '1em'}} component="a" href={`/library/${session.user.email}`}  icon={<MenuBookIcon style={{color: '#3f51b5'}} fontSize="large" />} label="Library" />
      <StyledBreadcrumb
        component="a"
        href="/info"
        style={{marginTop: '1em',  marginLeft: '1em'}}
        label="About"
        icon={<LiveHelpIcon style={{color: '#3f51b5'}} fontSize="large" />}
      />
<StyledBreadcrumb

        component="a"
        href={`/api/auth/signout`}
        label="Sign Out"
        style={{marginTop: '1em', marginLeft: '1em'}}
        onClick={(e) => {
          e.preventDefault()
          signOut()
        }}
        icon={<MeetingRoomIcon style={{color: '#3f51b5'}} fontSize="large" />}
      />
          {/* <li className={styles.navItem}><Link href="/client"><a>Client</a></Link></li>
          <li className={styles.navItem}><Link href="/server"><a>Server</a></Link></li>
          <li className={styles.navItem}><Link href="/protected"><a>Protected</a></Link></li>
          <li className={styles.navItem}><Link href="/api-example"><a>API</a></Link></li>
          <li className={styles.navItem}><Link href={`/library/${session.user.email}`}><a>Library</a></Link></li> */}
      </div>
        </ul>
     
      </nav></div>
      <hr/>
          </>}
          
        </p>

        
      </div>
     
    </header>
  )
}
