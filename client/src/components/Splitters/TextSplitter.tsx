import React, {
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
  const [textChunks, setTextChunks] = useState<string[]>([]);
  const [isInstructions, setInstructions] = useClipboard(`
    The total length of the content that I want to send you is too large
    to send in only one piece. 
    For sending you that content, I will follow this rule: 
    [START PART 1/10] this is the content of the part 1 out of 10 in total 
    [END PART 1/10] Then you just answer: "Received part 1/10" 
    And when I tell you "ALL PARTS SENT", then you can continue
    processing the data and answering my requests
  `);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const chunkSize = 4000;
    const chunks: string[] = [];

    // Convert the input value to an array of characters
    const characters = Array.from(value);

    for (let i = 0; i < characters.length; i += chunkSize) {
      const chunk = characters.slice(i, i + chunkSize).join("");
      chunks.push(chunk);
    }

    setTextChunks(chunks);
  };

  const handleCopy = (chunk: string) => {
    navigator.clipboard.writeText(chunk);
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
            maxRows={5} // Limit to 5 lines
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
      <div>
        {textChunks.map((chunk, index) => (
          <Button
            key={index}
            variant="contained"
            sx={{
              mt: 2,
              mr: 2,
              display: "inline-flex",
              ml: 10,
              fontWeight: 400,
              letterSpacing: ".3rem",
              textDecoration: "none",
              borderRadius: 5,
              alignItems: "center",
            }}
            onClick={() => handleCopy(chunk)}
          >
            {`Copy Chunk ${index + 1} to Clipboard`}
          </Button>
        ))}
      </div>

      <Box
        sx={{
          position: "relative",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "16px",
          marginTop: "16px",
          backgroundColor: "#f7f7f7",
          color: "#999999",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: "-10px",
            left: "8px",
            backgroundColor: "white",
            padding: "0 4px",
          }}
        >
          Instructions
        </Typography>
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
        onClick={setInstructions}
      >
        Copy Instructions (First Step before sending chunks of text to ChatGPT)
      </Button>
    </Container>
  );
}

export default TextSplitter;
