import React, {
  ChangeEvent,
  useState,
} from 'react';

import axios from 'axios';
import useClipboard from 'react-use-clipboard';

import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function YoutubeTextSplitter() {
  const [transcriptText, setTranscriptText] = useState<string>(""); // Initialize as an empty string

  const fetchTranscript = async (url: string) => {
    try {
      const response = await axios.get(`/api/youtube-transcript?url=${url}`);
      const dataResult = response.data.result;

      // Extract the 'text' properties and join them with spaces
      const joinedText = dataResult
        .map((obj: { text: string }) => obj.text)
        .join(" ");

      setTranscriptText(joinedText); // Update the state with the fetched transcript text

      console.log(joinedText);
      return response.data.result;
    } catch (error) {
      console.error(`Failed to fetch transcript: ${error}`);
      throw error;
    }
  };

  const TranscriptDisplay = ({
    transcriptText,
  }: {
    transcriptText: string;
  }) => {
    const containerStyle: React.CSSProperties = {
      maxHeight: "200px", // Adjust the maximum height as needed
      overflowY: "auto",
    };

    return (
      <div style={containerStyle}>
        <p>{transcriptText}</p>
      </div>
    );
  };

  const handleUrl = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const url = event.target.value;
    fetchTranscript(url);
  };

  const [isCopied, setCopied] = useClipboard(`
  The total length of the content that I want to send you is too large
  to send in only one piece. 
  For sending you that content, I will follow this rule: 
  [START PART 1/10] this is the content of the part 1 out of 10 in total 
  [END PART 1/10] Then you just answer: "Received part 1/10" 
  And when I tell you "ALL PARTS SENT", then you can continue
  processing the data and answering my requests
`);
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
        Youtube Splitter
      </Typography>
      <TextField
        id="filled-basic"
        label="Youtube URL"
        variant="outlined"
        onChange={handleUrl}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
          width: "100%", // Set initial width to 100% for responsiveness
          "@media (min-width: 768px)": {
            // Adjust the breakpoint as needed
            width: "400px", // Set wider width for desktop mode
          },
        }}
        InputLabelProps={{
          shrink: true,
          style: {
            position: "absolute",
            top: "1px",
            left: "0px",
            backgroundColor: "#fff",
            padding: "0 4px",
          },
        }}
        InputProps={{
          style: {
            borderRadius: "4px",
            padding: "8px",
            width: "100%", // Set width to 100% to fill the available space
          },
        }}
      />
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
      >
        Generate Transcript
      </Button>

      <Box
        sx={{
          position: "relative",

          borderRadius: "4px",
          padding: "16px",
          marginTop: "16px",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: "-10px", // Adjust as needed to align with the border
            left: "8px", // Adjust as needed for positioning
            backgroundColor: "white", // Semi-transparent background color
            padding: "0 4px",
          }}
        ></Typography>
        <TranscriptDisplay transcriptText={transcriptText} />

        {/* TODO ///////
        add copy parts buttons here, and create functionaility that splits up the portions of the transcript to meet the 4000 character limit chat gpt has


        functionaility should be able to split and based of the modulous create how evr many buttons needed for # of parts 
        */}
      </Box>
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
            top: "-10px", // Adjust as needed to align with the border
            left: "8px", // Adjust as needed for positioning
            backgroundColor: "white", // Semi-transparent background color
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
        onClick={setCopied}
      >
        Copy Instructions (First Step before sending chunks of text to ChatGPT)
      </Button>
    </Container>
  );
}

export default YoutubeTextSplitter;
