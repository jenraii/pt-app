import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../training.jpg';

function Home() {
    return (
        <div>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h6">TRAINING APPLICATION</Typography>
                </Toolbar>
            </AppBar>
            <img src={Logo} alt="training" />
        </div>
    );
}

export default Home;
