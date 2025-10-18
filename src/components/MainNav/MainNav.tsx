import { NavLink } from 'react-router'
import classes from './MainNav.module.css'
import cx from 'clsx'

export function MainNav() {
  return (
    <nav className={classes.nav}>
      <NavLink to="/" end className={({ isActive }) => (cx(classes.item, isActive && classes.itemActive))}>Kiểm phiếu</NavLink>
      <NavLink to="/calculator" end className={({ isActive }) => (cx(classes.item, isActive && classes.itemActive))}>Tính tổng số</NavLink>
    </nav>
  )
}
