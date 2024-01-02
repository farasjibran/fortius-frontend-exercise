import { useRemoveCommentArticle } from '@/services/api/comment/comment.hooks';
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
	VStack,
	useDisclosure,
} from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';

interface DeleteCommentProps {
	commentId: string;
	articleId: string;
}

export default function DeleteComment({
	commentId,
	articleId,
}: DeleteCommentProps) {
	const { onOpen, onClose, isOpen } = useDisclosure();

	const remove = useRemoveCommentArticle({ articleId: Number(articleId) });

	const handleDelete = () => {
		remove.mutate({
			commentArticleId: commentId,
		});

		onClose();
	};

	return (
		<>
			<IconButton
				aria-label="Delete Comment"
				colorScheme="red"
				shadow="xs"
				onClick={onOpen}
				icon={<FaTrashAlt />}
			/>
			<Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Delete Comment </ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack alignItems="stretch">
							<Text>Are you sure to delete this comment?</Text>
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
}
