import { useTheme } from '@emotion/react';
import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { useController } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

// Styles
import 'easymde/dist/easymde.min.css';
import styles from './PostFormMarkdown.module.scss';

export const PostFormMarkdown = ({ errors, control }) => {
  const theme = useTheme();

  const { field } = useController({
    name: 'text',
    control,
    rules: {
      required: 'Invalid text',
      minLength: {
        value: 10,
        message: 'Text must be at least 10 characters',
      },
    },
  });

  const markdownOptions = React.useMemo(() => {
    return {
      spellChecker: false,
      maxHeight: '400px',
      autofocus: false,
      placeholder: 'Type something...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    };
  }, []);

  return (
    <>
      <SimpleMDE
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        inputRef={field.ref}
        options={markdownOptions}
        className={
          theme.palette.mode === 'dark' ? styles.editorDark : styles.editorLight
        }
      />
      {errors?.text && (
        <FormHelperText sx={{ pt: '5px' }} error={true}>
          {errors.text?.message}
        </FormHelperText>
      )}
    </>
  );
};
