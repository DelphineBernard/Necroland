import { Modal, Box, IconButton, CardMedia } from '@mui/material';
import { PUBLIC_URL } from '../../../config';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import Close from '@mui/icons-material/Close';

const MorePhotosModal = ({ isOpen, onRequestClose, photos, currentPhotoIndex, nextPhoto, previousPhoto }) => {
    return (
        <Modal
            open={isOpen}
            onClose={onRequestClose}
            style={{
                backgroundColor: 'black',
            }}
        >
            <Box
                sx={{
                    borderRadius: 2,
                    position: 'relative',
                    margin: 'auto',
                    top: '50vh',
                    transform: 'translateY(-50%)'
                }}
            >
                <IconButton
                    onClick={onRequestClose}
                    sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px'
                    }}
                >
                    <Close sx={{ fontSize: 40, color: "white" }} />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton
                        onClick={previousPhoto}
                        sx={{
                            position: 'absolute',
                            left: '5px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                            p: 0
                        }}
                    >
                        <ArrowLeft sx={{ fontSize: 60, color: "white" }} />
                    </IconButton>
                    <CardMedia
                        component="img"
                        image={`${PUBLIC_URL}/${photos[currentPhotoIndex].name}`}
                        alt=""
                        sx={{
                            maxHeight: '90vh',
                            maxWidth: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </Box>
                <IconButton
                    onClick={nextPhoto}
                    sx={{
                        position: 'absolute',
                        right: '5px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                    }}
                >
                    <ArrowRight sx={{ fontSize: 60, color: "white" }} />
                </IconButton>
            </Box>
        </Modal>
    )
}

export default MorePhotosModal;