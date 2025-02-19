import { Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

export default function NavHeader() {
    const bg = blueGrey['100'];
    return (
        <Box className="navHeader" bgcolor={bg} padding="8px" marginBottom="10px">
            <div className=".arrow-back-action-container">
            <a href="/ui/login.html">
                <img src="/arrow-back-icon.svg" alt="arrow-back-icon" width="24" height="24" />
            </a>
            </div>
        </Box>        
    );
}