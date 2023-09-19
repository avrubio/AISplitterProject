import {
  ChangeEvent,
  useState,
} from 'react';

import useClipboard from 'react-use-clipboard';

import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function TextSplitter() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isCopied, setCopied] = useClipboard(`
  The total length of the content that I want to send you is too large
  to send in only one piece. 
  For sending you that content, I will follow this rule: 
  [START PART 1/10] this is the content of the part 1 out of 10 in total 
  [END PART 1/10] Then you just answer: "Received part 1/10" 
  And when I tell you "ALL PARTS SENT", then you can continue
  processing the data and answering my requests
`);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          display: { md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Text Splitter
      </Typography>

      <Grid container alignItems="center">
        <Grid item xs={12} md={12}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              color: "grey",
              fontSize: 12,
              letterSpacing: ".3rem",
              textDecoration: "none",
              textAlign: "right",
            }}
          >
            Character Count: {inputValue.length}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            id="filled-multiline-static"
            label="Paste Transcription Here"
            multiline
            minRows={3}
            variant="outlined"
            value={inputValue}
            onChange={handleChange}
            sx={{
              width: "100%",
            }}
            InputLabelProps={{
              shrink: true,
              style: {
                backgroundColor: "#fff",
                padding: "0 4px",
              },
            }}
            InputProps={{
              style: {
                borderRadius: "4px",
                padding: "8px",
                width: "100%",
              },
            }}
          />
        </Grid>
      </Grid>

      <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          display: { md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      ></Typography>

      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "16px",
          marginTop: "16px",
          backgroundColor: "#f7f7f7",
          color: "#999999",
        }}
      >
        <div>
          <p>
            The total length of the content that I want to send you is too large
            to send in only one piece. <br />
            For sending you that content, I will follow this rule: <br />
            [START PART 1/10] this is the content of the part 1 out of 10 in
            total <br />
            [END PART 1/10] Then you just answer: "Received part 1/10"
            <br /> And when I tell you "ALL PARTS SENT", then you can continue
            processing the data and answering my requests
          </p>
        </div>
      </Box>

      <Button
        variant="contained"
        sx={{
          mt: 2,
          mr: 2,
          display: { md: "flex" },

          fontWeight: 700,
          letterSpacing: ".3rem",

          textDecoration: "none",
        }}
        onClick={setCopied}
      >
        Copy Instructions (First Step before sending chunks of text to ChatGPT)
      </Button>
    </Container>
  );
}

export default TextSplitter;
