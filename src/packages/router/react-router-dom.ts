import { styled } from 'core'
import { Link as DefaultLink } from 'react-router-dom'

export {
  Route,
  Redirect,
  NavLink,
  HashRouter,
  BrowserRouter,
  Switch,
  Prompt,
  useLocation,
  useHistory,
  useParams
} from 'react-router-dom'

export const Link = styled(DefaultLink)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: none;
  }
`
