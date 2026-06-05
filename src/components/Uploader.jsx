import React from "react";

import { ConstantBasedPicker } from "@openimis/fe-core";
import {
  Grid,
  Typography,
  Button,
  Divider,
  Input,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";

import Block from "../components/Block";

const Uploader = ({
  acceptableFormats,
  blockName,
  blockTitle,
  formatMessage,
  forms,
  handleFieldChange,
  onPopupClose,
  onRegisterDownload,
  onSubmit,
  openPopup,
  popupName,
  popupState,
  strategies,
  uploadLabel,
  downloadLabel,
  uploadPopupMessage,
}) => (
  <>
    <Grid size={4}>
      <Block title={formatMessage(blockTitle)}>
        <Grid container spacing={2} direction="column">
          <Grid>
            <Typography variant="h6">{formatMessage(downloadLabel)}</Typography>
          </Grid>
          <Grid>
            <form noValidate>
              <Grid container spacing={1} direction="column">
                <ConstantBasedPicker
                  module="tools"
                  label="formatPicker"
                  onChange={(value) =>
                    handleFieldChange(blockName, "format", value)
                  }
                  required
                  constants={acceptableFormats}
                  withNull={false}
                />
                <Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onRegisterDownload(
                      blockName,
                      forms[blockName]?.format
                    )}
                    disabled={!forms[blockName]?.format}
                  >
                    {formatMessage("downloadBtn")}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid>
            <Divider fullWidth />
          </Grid>
          <Grid>
            <Typography variant="h6">{formatMessage(uploadLabel)}</Typography>
          </Grid>
          <Grid>
            <form noValidate>
              <Grid container spacing={1} direction="column">
                <Grid>
                  <Input
                    onChange={(event) =>
                      handleFieldChange(
                        blockName,
                        "file",
                        event.target.files[0]
                      )
                    }
                    required
                    id="import-button"
                    inputProps={{
                      accept: acceptableFormats,
                    }}
                    type="file"
                  />
                </Grid>
                <Grid>
                  <ConstantBasedPicker
                    module="tools"
                    label="strategyPicker"
                    onChange={(value) =>
                      handleFieldChange(blockName, "strategy", value)
                    }
                    required
                    constants={strategies}
                    withNull={false}
                  />
                </Grid>
                <Grid>
                  <FormControlLabel
                    label={formatMessage("dryRunLabel")}
                    control={
                      <Checkbox
                        checked={forms[blockName]?.dryRun}
                        onChange={(e) =>
                          handleFieldChange(
                            blockName,
                            "dryRun",
                            e.target.checked
                          )
                        }
                      />
                    }
                  />
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => openPopup(e, blockName)}
                    disabled={
                      !(forms[blockName]?.file && forms[blockName]?.strategy)
                    }
                  >
                    {formatMessage("uploadBtn")}
                  </Button>
                  {popupState?.open && popupState?.[popupName] && (
                    <Dialog open onClose={onPopupClose} fullWidth maxWidth="sm">
                      <DialogTitle>
                        {formatMessage(uploadPopupMessage)}
                      </DialogTitle>
                      <DialogActions>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => onSubmit(forms[blockName], blockName)}
                          disabled={
                            !(
                              forms[blockName]?.file &&
                              forms[blockName]?.strategy
                            )
                          }
                        >
                          {formatMessage("uploadBtn")}
                        </Button>
                        <Button onClick={onPopupClose} variant="contained">
                          {formatMessage("cancelBtn")}
                        </Button>
                      </DialogActions>
                    </Dialog>
                  )}
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Block>
    </Grid>
  </>
);

export default Uploader;
