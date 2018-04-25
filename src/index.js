import React, { Component } from 'react'
import { render } from 'react-dom'
import classNames from 'classnames'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from 'material-ui/Switch'
import { FormControlLabel, FormGroup } from 'material-ui/Form'
import Menu, { MenuItem } from 'material-ui/Menu'
import Drawer from 'material-ui/Drawer'
import List from 'material-ui/List'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const client = new ApolloClient({
    uri: 'https://55k3179px9.lp.gql.zone/graphql'
})

const drawerWidth = 240

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    appFrame: {
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%'
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    'appBarShift-left': {
        marginLeft: drawerWidth
    },
    'appBarShift-right': {
        marginRight: drawerWidth
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    hide: {
        display: 'none'
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    'content-left': {
        marginLeft: -drawerWidth
    },
    'content-right': {
        marginRight: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    'contentShift-left': {
        marginLeft: 0
    },
    'contentShift-right': {
        marginRight: 0
    }
})

const FEED_QUERY = gql`
    query FeedQuery {
        feed {
            id
            title
        }
    }
`

const FeedList = () => (
    <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error</p>
            return (
                <div>
                    {data.feed.map(link => (
                        <div>
                            {link.id}-{link.title}
                        </div>
                    ))}
                </div>
            )
        }}
    </Query>
)

const LINKS_QUERY = gql`
    {
        links
    }
`

const SidebarLinks = () => (
    <Query query={LINKS_QUERY}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error</p>

            return <Typography>{data.links}</Typography>
        }}
    </Query>
)

const Header = withStyles(styles)(({ classes, isOpen, handleOpen }) => (
    <AppBar
        className={classNames(classes.appBar, {
            [classes.appBarShift]: isOpen,
            [classes[`appBarShift-left`]]: isOpen
        })}>
        <Toolbar disableGutters={!isOpen}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleOpen}
                className={classNames(
                    classes.menuButton,
                    isOpen && classes.hide
                )}>
                <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
                Material GraphQL v0.36
            </Typography>
        </Toolbar>
    </AppBar>
))

const Sidebar = withStyles(styles, { withTheme: true })(
    ({ theme, classes, isOpen = false, handleClose }) => {
        const sidebarLinks = <SidebarLinks />

        return (
            <Drawer
                variant="persistent"
                anchor="left"
                open={isOpen}
                classes={{
                    paper: classes.drawerPaper
                }}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleClose}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                {sidebarLinks}
            </Drawer>
        )
    }
)

const Content = withStyles(styles)(({ classes, isOpen }) => (
    <main
        className={classNames(classes.content, classes[`content-left`], {
            [classes.contentShift]: isOpen,
            [classes[`contentShift-left`]]: isOpen
        })}>
        <div className={classes.drawerHeader} />
        <FeedList />
    </main>
))

const App = withStyles(styles)(
    class extends Component {
        state = {
            isOpen: false
        }

        render() {
            const { classes: { root, appFrame } } = this.props
            const { isOpen } = this.state

            const header = (
                <Header
                    isOpen={isOpen}
                    handleOpen={() => this.setState({ isOpen: true })}
                />
            )

            const sidebar = (
                <Sidebar
                    isOpen={isOpen}
                    handleClose={() => this.setState({ isOpen: false })}
                />
            )

            const content = <Content isOpen={isOpen} />

            return (
                <div className={root}>
                    <div className={appFrame}>
                        {header}
                        {sidebar}
                        {content}
                    </div>
                </div>
            )
        }
    }
)

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
