import { useState } from 'react';

type EventTagsData = {
  tags: string[];
};

type EventTagsProps = EventTagsData & {
  updateFields: (fields: Partial<EventTagsData>) => void;
};

export function EventTags({ tags, updateFields }: EventTagsProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestedTags, setSuggestedTags] = useState(['Ecommerce', 'IT', 'Business']);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Reset the suggestions when the input is empty
    if (value === '') {
      setSuggestedTags(['Ecommerce', 'IT', 'Business']);
    } else {
      // Filter suggestions based on the input value
      const filteredTags = suggestedTags.filter((tag) => tag.toLowerCase().includes(value.toLowerCase()));
      setSuggestedTags(filteredTags);
    }
  };
  const handleTagClick = (tag: string) => {
    // Add the clicked tag to the list of selected tags
    if (!tags.includes(tag)) {
      const updatedTags = [...tags, tag];
      updateFields({ tags: updatedTags });
      setInputValue('');
      setSuggestedTags(['Ecommerce', 'IT', 'Business']);
    }
  };

  const handleTagRemove = (tag: string) => {
    // Remove the selected tag
    const updatedTags = tags.filter((t) => t !== tag);
    updateFields({ tags: updatedTags });
  };

  return (
    <div className="mt-2 flex w-full flex-col">
      <h2 className="mb-2 text-center text-xl">Choose 1-3 Industry keywords</h2>

      <div className="mt-4">
        <div>
          {tags.map((tag) => (
            <span key={tag} className="tag m-1 inline-flex items-center rounded-lg bg-blue-200 px-2 py-1 text-blue-600">
              {tag}
              <button onClick={() => handleTagRemove(tag)} className="ml-1 text-red-600">
                x
              </button>
            </span>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search for industry..."
          value={inputValue}
          onChange={handleInputChange}
          className="w-full rounded-lg border border-gray-300 p-2"
        />

        <div className="suggested-tags mt-2">
          {inputValue && suggestedTags.length > 0
            ? suggestedTags.map((tag) => (
                <div
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="tag m-1 cursor-pointer rounded-lg bg-gray-200 px-2 py-1 text-gray-700 hover:bg-blue-200 hover:text-blue-600"
                >
                  {tag}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
