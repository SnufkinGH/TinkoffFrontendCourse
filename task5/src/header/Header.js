import {AppBar, Toolbar, Typography} from "@mui/material";

const Header = () => {
    return <AppBar position={"static"} sx={{backgroundColor: '#645a90'}} >
        <Toolbar sx={{marginLeft:5, marginRight:5}} disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    flexGrow: 1,
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none'
                }}
            >
                Админка фильмотеки
            </Typography>
            <Typography
                variant="h6"
                noWrap
                sx={{
                    flexGrow: 0,
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                Хохлов Андрей 6407
            </Typography>
        </Toolbar>
    </AppBar>
}

export default Header;