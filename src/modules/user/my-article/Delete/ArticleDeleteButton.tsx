import {
	Button,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';

import { useRemoveArticle } from '@/services/api/articles/articles.hooks';

interface ArticleDeleteButtonProps {
	articleId: string;
}

const ArticleDeleteButton = ({ articleId }: ArticleDeleteButtonProps) => {
	const { onOpen, isOpen, onClose } = useDisclosure();

	const remove = useRemoveArticle();

	const handleDelete = () => {
		remove.mutate({
			articleId,
		});

		onClose();
	};

	return (
		<>
			<IconButton
				aria-label="Delete Article"
				colorScheme="red"
				shadow="xs"
				onClick={onOpen}
				icon={<FaTrashAlt />}
			/>
			<Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Delete Article </ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack alignItems="stretch">
							<Text>Are you sure to delete this article?</Text>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button
							colorScheme="red"
							onClick={handleDelete}
							isLoading={remove.isPending}>
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ArticleDeleteButton;
