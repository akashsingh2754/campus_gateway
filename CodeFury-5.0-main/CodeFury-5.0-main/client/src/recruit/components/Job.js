import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Chip } from '@mantine/core';
import { List } from '@mantine/core';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Job(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
   {console.log(props)}
      <CardMedia
        component="img"
        height="194"
        image={require(`${props.data.logo}`)}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <List>{props.data.company}</List>
        <Typography paragraph>   {props.data.description}</Typography>
        
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" href={'https://forms.gle/cDkaMcsbSH98FnW48'} target='_blank'>
          <FavoriteIcon />
        </IconButton>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>:</Typography>
         
          <Typography paragraph>
          <List>
      <List.Item><Chip color="red" variant="filled" size="lg">{props.data.contract}</Chip></List.Item>
      <List.Item><Chip color="red" variant="filled" size="lg">{props.data.languages}</Chip></List.Item>
      <List.Item><Chip color="red" variant="filled" size="lg">{props.data.location}</Chip></List.Item>
      <List.Item><Chip color="red" variant="filled" size="lg">{props.data.level}</Chip></List.Item>
      <List.Item><Chip color="red" variant="filled" size="lg">{props.data.level}</Chip></List.Item>
      {/* <List.Item><Chip color="red" variant="filled" size="lg">{props.data.positon}</Chip></List.Item> */}
      <List.Item><Chip color="red" variant="filled" size="lg">{props.data.role}</Chip></List.Item>

    </List>
       hard and reach great heights and work 
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
